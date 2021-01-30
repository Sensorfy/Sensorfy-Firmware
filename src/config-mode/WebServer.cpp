#include "WebServer.h"

WebServer::WebServer(FileSystem *fileSystem) : _fileSystem{fileSystem} {}

void WebServer::start()
{
    if (_running)
    {
        DEBUG_PRINTLN(F("Web server is already started!"));
        return;
    }

    DEBUG_PRINTLN(F("Starting web server..."));

#if DEBUG_ENABLED
    // Add logging handler (will never handle any requests)
    _server.addHandler(&_requestLoggerHandler);
#endif

    // Serve static files from the file system
    _server.serveStatic("/", *(_fileSystem->getUnderlyingFs()), "/web")
        .setDefaultFile("index.html");

    // Redirect all other URLs to the main page
    _server.addHandler(&_captiveRedirectHandler);

    _server.begin();

    _running = true;
}

void WebServer::stop()
{
    if (!_running)
    {
        DEBUG_PRINTLN(F("Web server is already stopped!"));
        return;
    }

    DEBUG_PRINTLN(F("Stopping web server..."));

    _server.end();
    _server.reset();

    _running = false;
}