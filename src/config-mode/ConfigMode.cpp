#include "ConfigMode.h"

#include "utils/debug.h"

ConfigMode::ConfigMode(FileSystem *fileSystem,
                       NodeConfig *nodeConfig,
                       InternalDigitalPortExpander *internalDigitalPortExpander)
    : _fileSystem{fileSystem},
      _nodeConfig{nodeConfig},
      _internalDigitalPortExpander{internalDigitalPortExpander},
      _webServer{fileSystem, &_webSocketServer} {}

void ConfigMode::startWiFiAccessPoint()
{
    const char *ssid = _nodeConfig->getSettings().node_name;

    // TODO: Add password protection

    DEBUG_PRINTF("Starting WiFi access point with SSID \"%s\"...\n", ssid);

    // Don't store WiFi state in flash
    WiFi.persistent(false);

#if DEBUG_ENABLED
    // Register event handlers
    _stationConnectedHandler = WiFi.onSoftAPModeStationConnected([](const WiFiEventSoftAPModeStationConnected &evt) {
        DEBUG_PRINTF("New WiFi station connected: %02x:%02x:%02x:%02x:%02x:%02x\n",
                     evt.mac[0], evt.mac[1], evt.mac[2], evt.mac[3], evt.mac[4], evt.mac[5]);
    });
    _stationDisconnectedHandler = WiFi.onSoftAPModeStationDisconnected([](const WiFiEventSoftAPModeStationDisconnected &evt) {
        DEBUG_PRINTF("WiFi station %02x:%02x:%02x:%02x:%02x:%02x disconnected.\n",
                     evt.mac[0], evt.mac[1], evt.mac[2], evt.mac[3], evt.mac[4], evt.mac[5]);
    });
#endif

    // Configure AP
    WiFi.mode(WIFI_STA);
    WiFi.setOutputPower(0);
    WiFi.softAP(ssid);

#if DEBUG_ENABLED
    DEBUG_PRINTF("WiFi active. MAC: %s, IP: %s\n",
                 WiFi.softAPmacAddress().c_str(), WiFi.softAPIP().toString().c_str());
#endif
}

void ConfigMode::stopWiFiAccessPoint()
{
    DEBUG_PRINTLN(F("Stopping WiFi access point..."));

#if DEBUG_ENABLED
    // Unregister event handlers
    _stationConnectedHandler = WiFiEventHandler{};
    _stationDisconnectedHandler = WiFiEventHandler{};
#endif

    // Do the same as ESP8266WiFiClass::preinitWiFiOff() on preinit
    WiFi.mode(WIFI_OFF);
    WiFi.forceSleepBegin();
}

void ConfigMode::startDNSServer()
{
    DEBUG_PRINTLN(F("Starting DNS server..."));

    // Handle all requests to act as a captive portal
    _dnsServer.setTTL(60);
    _dnsServer.start(53, "*", WiFi.softAPIP());
}

void ConfigMode::stopDNSServer()
{
    DEBUG_PRINTLN(F("Stopping DNS server..."));

    _dnsServer.stop();
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
    startDNSServer();
    _webServer.start();

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

    _webSocketServer.closeConnections();
    _webServer.stop();
    stopDNSServer();
    stopWiFiAccessPoint();

    _internalDigitalPortExpander->setConfigModeLED(false);

    _enabled = false;
}

void ConfigMode::tick()
{
    if (!_enabled)
        return;

    _dnsServer.processNextRequest();
}