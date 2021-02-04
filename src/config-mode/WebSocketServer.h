#pragma once

#include <ESPAsyncWebServer.h>

#include "proto/commands.pb.h"
#include "utils/callbacks.h"

#define WEBSOCKET_URL "/ws"

class WebSocketServer
{
private:
    AsyncWebSocket _socket{WEBSOCKET_URL};

    CommandReceivedHandler _commandReceivedHandler;

    void handleEvent(AsyncWebSocket *server,
                     AsyncWebSocketClient *client,
                     AwsEventType type,
                     void *arg,
                     uint8_t *data,
                     size_t len);

    void handleMessage(uint8_t *data, size_t size);

public:
    WebSocketServer();

    void closeConnections();

    void onCommandReceived(CommandReceivedHandler handler)
    {
        _commandReceivedHandler = handler;
    }

    AsyncWebHandler *getHandler() { return &_socket; }
};