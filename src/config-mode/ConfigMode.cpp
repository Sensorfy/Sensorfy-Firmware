#include "ConfigMode.h"

#include <ESP8266WiFi.h>

#include "utils/debug.h"

ConfigMode::ConfigMode(FileSystem *fileSystem,
                       NodeConfig *nodeConfig,
                       InternalDigitalPortExpander *internalDigitalPortExpander)
    : _fileSystem{fileSystem},
      _nodeConfig{nodeConfig},
      _internalDigitalPortExpander{internalDigitalPortExpander} {}

void ConfigMode::startWiFiAccessPoint()
{
    const char *ssid = _nodeConfig->getSettings().node_name;

    // TODO: Add password protection

    DEBUG_PRINTF("Starting WiFi access point with SSID \"%s\"...\n", ssid);

    // Don't store WiFi state in flash
    WiFi.persistent(false);

    // Configure AP
    WiFi.mode(WIFI_STA);
    WiFi.setOutputPower(0);
    WiFi.softAP(ssid);

    DEBUG_PRINTF("WiFi active. MAC: %s, IP: %s\n",
                 WiFi.softAPmacAddress().c_str(), WiFi.softAPIP().toString().c_str());
}

void ConfigMode::stopWiFiAccessPoint()
{
    DEBUG_PRINTLN(F("Stopping WiFi access point..."));

    WiFi.mode(WIFI_OFF);
    WiFi.forceSleepBegin();
}

void ConfigMode::enable()
{
    if (_enabled)
    {
        DEBUG_PRINTLN(F("Config mode already enabled!"));
        return;
    }

    DEBUG_PRINTLN(F("Enabling config mode..."));

    _internalDigitalPortExpander->setConfigModeLED(true);

    startWiFiAccessPoint();

    _enabled = true;
}

void ConfigMode::disable()
{
    if (!_enabled)
    {
        DEBUG_PRINTLN(F("Config mode already disabled!"));
        return;
    }

    DEBUG_PRINTLN(F("Disabling config mode..."));

    stopWiFiAccessPoint();

    _internalDigitalPortExpander->setConfigModeLED(false);

    _enabled = false;
}