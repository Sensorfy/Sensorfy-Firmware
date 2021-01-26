#pragma once

#include "FileSystem.h"

#define NODE_CONFIG_FILE_NAME "/config.json"

struct NodeSettings
{
    char nodeName[64];
};

class NodeConfig
{
private:
    FileSystem *_fileSystem;

    bool _settingsLoaded;
    NodeSettings _settings;

    void loadConfigFile();
    void saveConfigFile();

public:
    NodeConfig(FileSystem *fileSystem);

    NodeSettings getSettings();
    void updateSettings(NodeSettings settings);
};