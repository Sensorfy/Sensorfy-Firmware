#include "NodeConfig.h"

#include "debug.h"

NodeConfig::NodeConfig(FileSystem *fileSystem) : _fileSystem{fileSystem} {}

void NodeConfig::loadConfigFile()
{
    DEBUG_PRINTLN(F("Loading config file..."));

    // TODO
}

void NodeConfig::saveConfigFile()
{
    DEBUG_PRINTLN(F("Saving config file..."));

    // TODO
}

NodeSettings NodeConfig::getSettings()
{
    if (!_settingsLoaded)
    {

        _settingsLoaded = true;
    }

    return {};
}

void NodeConfig::updateSettings(NodeSettings settings)
{
}
