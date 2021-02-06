#include "WebSocketServer.h"

#include <functional>

#include "utils/debug.h"
#include "utils/Protobuf.h"

WebSocketServer::WebSocketServer()
{
    _socket.onEvent(std::bind(&WebSocketServer::handleEvent,
                              this,
                              std::placeholders::_1,
                              std::placeholders::_2,
                              std::placeholders::_3,
                              std::placeholders::_4,
                              std::placeholders::_5,
                              std::placeholders::_6));
}

void WebSocketServer::handleEvent(AsyncWebSocket *server,
                                  AsyncWebSocketClient *client,
                                  AwsEventType type,
                                  void *arg,
                                  uint8_t *data,
                                  size_t len)
{
    switch (type)
    {
    case WS_EVT_CONNECT:
        DEBUG_PRINTF("New websocket client connected: #%u (%s)\n", client->id(), client->remoteIP().toString().c_str());
        if (_clientConnectedHandler != NULL)
            _clientConnectedHandler();
        break;

    case WS_EVT_DISCONNECT:
        DEBUG_PRINTF("Websocket client #%u disconnected.\n", client->id());
        break;

    case WS_EVT_ERROR:
        DEBUG_PRINTF("Websocket error from client #%u: [%u] %s\n", client->id(), *((uint16_t *)arg), (char *)data);
        break;

    case WS_EVT_DATA:
    {
        AwsFrameInfo *info = (AwsFrameInfo *)arg;

        if (info->index != 0 || !info->final || info->len != len)
        {
            DEBUG_PRINTF("Received a multi-frame message from client #%u. This is currently not supported.\n", client->id());
            break;
        }

        if (info->opcode != WS_BINARY)
        {
            DEBUG_PRINTF("Received a non-binary message from client #%u. This is unexpected.\n", client->id());
            break;
        }

        if (len == 0)
            break;

#if DEBUG_ENABLED
        DEBUG_PRINTF("Received %u bytes from client #%u:", len, client->id());
        for (size_t i = 0; i < len; i++)
            Debug.printf_P(PSTR(" %02x"), data[i]);
        Debug.println();
#endif

        handleMessage(data, len);

        break;
    }

    default:
        break;
    }
}

void WebSocketServer::handleMessage(uint8_t *data, size_t size)
{
    // Decode command
    Command command = Command_init_zero;
    if (!Protobuf.decode(data, size, Command_fields, &command))
    {
        DEBUG_PRINTLN(F("Invalid command format. Ignored."));
        return;
    }

    // Handle command
    if (_commandReceivedHandler != NULL)
        _commandReceivedHandler(command);
}

void WebSocketServer::closeConnections()
{
    DEBUG_PRINTLN(F("Closing all client connections..."));

    _socket.closeAll();
}

void WebSocketServer::broadcastReport(Report &report)
{
    // Encode report
    uint8_t buffer[Report_size];
    size_t encoded = Protobuf.encode(buffer, Report_size, Report_fields, &report);
    if (!encoded)
    {
        DEBUG_PRINTLN(F("Encoding report failed. Report will not be send."));
        return;
    }

    // Broadcast data
    DEBUG_PRINTF("Broadcasting a report of %u bytes to all clients...\n", encoded);
    _socket.binaryAll(buffer, encoded);
}