#include <Arduino.h>

#include "utils/debug.h"
#include "persistence/FileSystem.h"
#include "persistence/NodeConfig.h"

#if DEBUG_ENABLED
#warning Debug output is enabled. Make sure GPIO16 is disconnected from RST before flashing this image.
SoftwareSerial Debug;
#endif

FileSystem _fileSystem;
NodeConfig _nodeConfig{&_fileSystem};

void setup()
{
#if DEBUG_ENABLED
  // Enable serial debug output on GPIO16
  Debug.begin(9600, SWSERIAL_8N1, -1, D0);
#endif

  DEBUG_PRINTF("Initializing Sensorfy firmware (Built on %S %S)...\n", F(__DATE__), F(__TIME__));

  _fileSystem.mount();
  _nodeConfig.printSettingsToDebug();

  delay(5000);
  NodeSettings s = _nodeConfig.getSettings();
  strcpy(s.node_name, "Testnode 1");
  _nodeConfig.updateSettings(s);
}

void loop()
{
}