#include "CommunicationManager.h"

#include <functional>

#include "utils/utils.h"
#include "utils/debug.h"

CommunicationManager::CommunicationManager(ConfigMode *configMode, NodeConfig *nodeConfig)
    : _configMode{configMode}, _nodeConfig{nodeConfig}
{
    // Handle when new clients connect to the websocket server so we can send them initial reports
    _configMode->onClientConnected(std::bind(&CommunicationManager::sendInitialConfigModeReports, this));

    // Register as handler for commands that are received via WiFi
    _configMode->onCommandReceived(std::bind(&CommunicationManager::handleGenericCommand,
                                             this,
                                             std::placeholders::_1,
                                             CONFIG_MODE_WIFI));
}

void CommunicationManager::sendInitialConfigModeReports()
{
    DEBUG_PRINTLN("Sending initial reports to all config mode clients...");

    // Broadcast the initial reports to all config mode clients
    // If multiple clients are connected, some might receive a report twice, but it's easier to do it this way.
    sendNodeSettingsReport(CONFIG_MODE_WIFI);
}

void CommunicationManager::handleGenericCommand(Command &command, CommunicationChannel sourceChannel)
{
    // Handle the command based on the value of the oneof-feature
    switch (command.which_command)
    {
    case Command_setConfigModeCommand_tag:
        handleCommand(command.command.setConfigModeCommand, sourceChannel);
        break;
    case Command_setNodeSettingsCommand_tag:
        handleCommand(command.command.setNodeSettingsCommand, sourceChannel);
        break;
    }
}

void CommunicationManager::handleCommand(SetConfigModeCommand &command, CommunicationChannel sourceChannel)
{
    DEBUG_PRINTF("Handling SetConfigModeCommand {enabled: %S}...\n", btoa(command.enabled));

    // TODO: Disable config mode
}

void CommunicationManager::handleCommand(SetNodeSettingsCommand &command, CommunicationChannel sourceChannel)
{
    DEBUG_PRINTF("Handling SetNodeSettingsCommand "
                 "{node_name: \"%s\", node_contact: \"%s\", location_lat: %f, location_long: %f, wifi_password: \"%s\", wake_interval: %u}...\n",
                 command.node_name,
                 command.node_contact,
                 command.location_lat,
                 command.location_long,
                 command.wifi_password,
                 command.wake_interval);

    // Query current settings
    NodeSettings settings = _nodeConfig->getSettings();

    DEBUG_ASSERT(sizeof(settings.node_name) == sizeof(command.node_name));
    strncpy(settings.node_name, command.node_name, sizeof(settings.node_name));

    DEBUG_ASSERT(sizeof(settings.node_contact) == sizeof(command.node_contact));
    strncpy(settings.node_contact, command.node_contact, sizeof(settings.node_contact));

    if (command.location_lat == 0 || command.location_long == 0)
    {
        settings.location_lat = settings.location_long = 0;
    }
    else
    {
        settings.location_lat = command.location_lat;
        settings.location_long = command.location_long;
    }

    // Change the WiFi password only, if it should be disabled or replaced
    // To keep the previous password, the client will send a non-empty password thats shorter than 8 characters
    if (command.wifi_password[0] == '\0' || strlen(command.wifi_password) >= 8)
    {
        DEBUG_ASSERT(sizeof(settings.wifi_password) == sizeof(command.wifi_password));
        strncpy(settings.wifi_password, command.wifi_password, sizeof(settings.wifi_password));
    }

    if (command.wake_interval >= 60)
        settings.wake_interval = command.wake_interval;

    // Update settings
    _nodeConfig->updateSettings(settings);

    // Broadcast the changed node settings to all config mode clients
    sendNodeSettingsReport(CONFIG_MODE_WIFI);
}

void CommunicationManager::sendReport(Report &report, CommunicationChannel channels)
{
    if ((channels & CONFIG_MODE_WIFI) != 0)
        _configMode->broadcastReport(report);
}

void CommunicationManager::sendNodeSettingsReport(CommunicationChannel channels)
{
    DEBUG_PRINTLN("Sending NodeSettingsReport...");

    NodeSettings settings = _nodeConfig->getSettings();

    Report report = Report_init_default;
    report.which_report = Report_nodeSettingsReport_tag;
    NodeSettingsReport &nodeSettingsReport = report.report.nodeSettingsReport;

    snprintf_P(nodeSettingsReport.firmware_version, sizeof(nodeSettingsReport.firmware_version),
               PSTR("Build %S %S"), F(__DATE__), F(__TIME__));

    DEBUG_ASSERT(sizeof(nodeSettingsReport.node_name) == sizeof(settings.node_name));
    strncpy(nodeSettingsReport.node_name, settings.node_name, sizeof(nodeSettingsReport.node_name));

    DEBUG_ASSERT(sizeof(nodeSettingsReport.node_contact) == sizeof(settings.node_contact));
    strncpy(nodeSettingsReport.node_contact, settings.node_contact, sizeof(nodeSettingsReport.node_contact));

    nodeSettingsReport.location_lat = settings.location_lat;
    nodeSettingsReport.location_long = settings.location_long;

    nodeSettingsReport.wifi_password_set = (settings.wifi_password[0] != '\0');
    nodeSettingsReport.wake_interval = settings.wake_interval;

    DEBUG_ASSERT(sizeof(nodeSettingsReport.app_eui) == sizeof(settings.app_eui));
    memcpy(nodeSettingsReport.app_eui, settings.app_eui, sizeof(nodeSettingsReport.app_eui));

    DEBUG_ASSERT(sizeof(nodeSettingsReport.dev_eui) == sizeof(settings.dev_eui));
    memcpy(nodeSettingsReport.dev_eui, settings.dev_eui, sizeof(nodeSettingsReport.dev_eui));

    nodeSettingsReport.app_key_set = (settings.app_key[0] != '\0');

    nodeSettingsReport.link_check_enabled = settings.link_check_enabled;
    nodeSettingsReport.adr_enabled = settings.adr_enabled;
    nodeSettingsReport.spreading_factor = settings.spreading_factor;
    nodeSettingsReport.tx_power = settings.tx_power;

    sendReport(report, channels);
}