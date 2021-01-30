#pragma once

#include <ESPAsyncWebServer.h>

#include "utils/debug.h"
#include "persistence/FileSystem.h"

#define WEBSERVER_PORT 80
#define WEBSERVER_URL "http://sensorfy-config/index.html"

#if DEBUG_ENABLED
// A fake-handler for logging requests to the debug log
class RequestLoggerHandler : public AsyncWebHandler
{
public:
    bool canHandle(AsyncWebServerRequest *request)
    {
        DEBUG_PRINTF("HTTP request: %s %s\n", request->methodToString(), request->url().c_str());
        return false;
    }

    void handleRequest(AsyncWebServerRequest *request) {}
};
#endif

// A handler for redirecting unknown requests to the main page
class CaptiveRedirectHandler : public AsyncWebHandler
{
public:
    bool canHandle(AsyncWebServerRequest *request)
    {
        return true;
    }

    void handleRequest(AsyncWebServerRequest *request)
    {
        DEBUG_PRINTF("Redirecting to: %S\n", F(WEBSERVER_URL));

        // Do a temporary redirect
        AsyncWebServerResponse *response = request->beginResponse(307);
        response->addHeader("Location", WEBSERVER_URL);
        request->send(response);
    }
};

class WebServer
{
private:
    FileSystem *_fileSystem;

    AsyncWebServer _server{WEBSERVER_PORT};

    bool _running{false};

#if DEBUG_ENABLED
    RequestLoggerHandler _requestLoggerHandler;
#endif
    CaptiveRedirectHandler _captiveRedirectHandler;

public:
    WebServer(FileSystem *fileSystem);

    void start();
    void stop();
};