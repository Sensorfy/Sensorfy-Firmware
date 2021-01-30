#pragma once

#include "FileSystem.h"
#include "proto/config.pb.h"

#define NODE_CONFIG_FILE_NAME "/config.bin"

#define SETTINGS_VERSION 1

class NodeConfig
{
private:
    FileSystem *_fileSystem;

    bool _settingsLoaded;
    NodeSettings _settings;

    void initSettings();

    void migrateSettings(NodeSettings &settings);

    void loadConfigFile();
    void saveConfigFile();

public:
    NodeConfig(FileSystem *fileSystem);

    NodeSettings getSettings();
    void updateSettings(NodeSettings settings);
    void resetSettings();

    void printSettingsToDebug();
};