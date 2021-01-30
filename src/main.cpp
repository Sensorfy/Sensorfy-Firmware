#include <Arduino.h>
#include <ESP8266WiFi.h>

#include "utils/debug.h"
#include "persistence/FileSystem.h"
#include "persistence/NodeConfig.h"
#include "hardware/InternalDigitalPortExpander.h"
#include "config-mode/ConfigMode.h"

#define CONFIG_MODE_AND_DEBUG_PIN D0
#define FACTORY_RESET_PIN A0

#if DEBUG_ENABLED
#warning Debug output is enabled. Please disable for production builds to optimize power consumption.
SoftwareSerial Debug;
#endif

FileSystem _fileSystem;
NodeConfig _nodeConfig{&_fileSystem};
InternalDigitalPortExpander _internalDigitalPortExpander;
ConfigMode _configMode{&_fileSystem, &_nodeConfig, &_internalDigitalPortExpander};

// Make sure the WiFi modem doesn't start up on boot
void preinit()
{
  // Global WiFi constructors are not called yet so there is a static method for this
  // https://github.com/esp8266/Arduino/issues/2111#issuecomment-22425139
  ESP8266WiFiClass::preinitWiFiOff();
}

void setup()
{
  // Should the config mode be enabled?
  pinMode(CONFIG_MODE_AND_DEBUG_PIN, INPUT_PULLDOWN_16);
  bool configMode = digitalRead(CONFIG_MODE_AND_DEBUG_PIN) == HIGH;

  // Should a factory reset be performed?
  bool factoryReset = analogRead(FACTORY_RESET_PIN) < 100;

#if DEBUG_ENABLED

  // Wait until GPIO16 is free before using it for serial logging
  if (configMode)
  {
    while (digitalRead(CONFIG_MODE_AND_DEBUG_PIN) == HIGH)
      delay(10);
  }

  // Wait a moment before reconfiguring the port (otherwise it prints crap to the console :D)
  delay(10);

  // Enable serial debug output on GPIO16
  Debug.begin(9600, SWSERIAL_8N1, -1, CONFIG_MODE_AND_DEBUG_PIN);

  DEBUG_PRINTLN(F("----------"));
  DEBUG_PRINTF("Starting Sensorfy firmware (Built: %S %S)...\n", F(__DATE__), F(__TIME__));
  DEBUG_PRINTF("Booting into %S%s mode...\n", configMode ? F("CONFIG") : F("NORMAL"), factoryReset ? F(" + FACTORY RESET") : F(""));
  DEBUG_PRINTLN(F("----------"));

#endif

  // Initialization
  _fileSystem.mount();

  // Perform factory reset, if requested
  if (factoryReset)
  {
    DEBUG_PRINTLN(F("Performing factory reset..."));
    _nodeConfig.resetSettings();
    // TODO: Add more.
  }

  // Debugging feature
  _nodeConfig.printSettingsToDebug();

  // Enable config mode, if requested
  if (configMode)
    _configMode.enable();
}

void loop()
{
}