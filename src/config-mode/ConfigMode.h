#pragma once

#include <ESP8266WiFi.h>
#include <DNSServer.h>

#include "persistence/FileSystem.h"
#include "persistence/NodeConfig.h"
#include "hardware/InternalDigitalPortExpander.h"
#include "WebServer.h"
#include "WebSocketServer.h"

class ConfigMode
{
private:
    FileSystem *_fileSystem;
    NodeConfig *_nodeConfig;
    InternalDigitalPortExpander *_internalDigitalPortExpander;

    WebServer _webServer;
    WebSocketServer _webSocketServer;

    DNSServer _dnsServer;

    bool _enabled{false};

#if DEBUG_ENABLED
    WiFiEventHandler _stationConnectedHandler;
    WiFiEventHandler _stationDisconnectedHandler;
#endif

    void startWiFiAccessPoint();
    void stopWiFiAccessPoint();

    void startDNSServer();
    void stopDNSServer();

public:
    ConfigMode(FileSystem *fileSystem, NodeConfig *nodeConfig, InternalDigitalPortExpander *internalDigitalPortExpander);

    void enable();
    void disable();

    void tick();

    void broadcastReport(Report &report)
    {
        _webSocketServer.broadcastReport(report);
    }

    void onClientConnected(ClientConnectedHandler handler)
    {
        _webSocketServer.onClientConnected(handler);
    }

    void onCommandReceived(CommandReceivedHandler handler)
    {
        _webSocketServer.onCommandReceived(handler);
    }

    bool isEnabled() { return _enabled; }
};