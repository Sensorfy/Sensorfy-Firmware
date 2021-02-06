#include "NodeConfig.h"

#include "utils/debug.h"
#include "utils/Protobuf.h"

NodeConfig::NodeConfig(FileSystem *fileSystem) : _fileSystem{fileSystem} {}

void NodeConfig::initSettings()
{
    DEBUG_PRINTLN(F("Initializing settings..."));

    NodeSettings settings = NodeSettings_init_default;
    settings.version = SETTINGS_VERSION;

    // Generate a name with a random component to differentiate nodes
    snprintf_P(settings.node_name, sizeof(settings.node_name),
               PSTR("Unnamed Sensorfy Node %d"), random(1000, 9999));

    // Wake every hour by default
    settings.wake_interval = 1 * 60 * 60;

    // Link-check mode is preferred to be enabled by default
    settings.link_check_enabled = true;

    // Enable ADR by default
    settings.adr_enabled = true;

    // TODO: Pre-define spreading factor and tx power?

    _settings = settings;
}

void NodeConfig::migrateSettings(NodeSettings &settings)
{
    // There is currently only one version.
    // Add migrations here as soon as necessary.

    //settings.version = SETTINGS_VERSION;
}

void NodeConfig::loadConfigFile()
{
    DEBUG_PRINTLN(F("Loading config file..."));

    // Open file
    File configFile = _fileSystem->getUnderlyingFs()->open(NODE_CONFIG_FILE_NAME, "r");
    if (!configFile)
    {
        DEBUG_PRINTLN(F("Opening config file failed. Settings will be reinitialized."));
        initSettings();
        return;
    }

    // Decode settings
    NodeSettings settings = NodeSettings_init_zero;
    if (!Protobuf.decode(configFile, NodeSettings_fields, &settings))
    {
        DEBUG_PRINTLN(F("Invalid config file format. Settings will be reinitialized."));
        initSettings();
    }
    else
    {
        migrateSettings(settings);
        _settings = settings;
    }

    // Close file
    configFile.close();
}

void NodeConfig::saveConfigFile()
{
    DEBUG_PRINTLN(F("Saving config file..."));

    // Open and truncate file
    File configFile = _fileSystem->getUnderlyingFs()->open(NODE_CONFIG_FILE_NAME, "w");
    if (!configFile)
    {
        DEBUG_PRINTLN(F("Opening config file for writing failed. Settings will not be saved."));
        return;
    }

    // Encode settings
    if (!Protobuf.encode(configFile, NodeSettings_fields, &_settings))
    {
        DEBUG_PRINTLN(F("Encoding settings failed. Settings will not be saved."));
    }

    // Close file
    configFile.close();
}

NodeSettings NodeConfig::getSettings()
{
    // Settings already loaded into RAM?
    if (!_settingsLoaded)
    {
        // Can they be read from the file system?
        if (_fileSystem->getUnderlyingFs()->exists(NODE_CONFIG_FILE_NAME))
        {
            loadConfigFile();
        }
        else
        {
            initSettings();
            saveConfigFile();
        }

        _settingsLoaded = true;
    }

    return _settings;
}

void NodeConfig::updateSettings(NodeSettings settings)
{
    // Ensure the version is correct
    settings.version = SETTINGS_VERSION;

    _settings = settings;

    saveConfigFile();
}

void NodeConfig::resetSettings()
{
    // Reset settings to initial values
    initSettings();
    saveConfigFile();
    _settingsLoaded = true;
}

void NodeConfig::printSettingsToDebug()
{
#if DEBUG_ENABLED
    NodeSettings settings = getSettings();

    DEBUG_PRINTF("Settings version: %u\n", settings.version);
    DEBUG_PRINTF("Node name: %s\n", settings.node_name);
    DEBUG_PRINTF("Node location: %f %f\n", settings.location_lat, settings.location_long);
    // TODO: Log all setting values
#endif
}
