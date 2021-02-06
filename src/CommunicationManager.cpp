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
    }
}

void CommunicationManager::handleCommand(SetConfigModeCommand &command, CommunicationChannel sourceChannel)
{
    DEBUG_PRINTF("Handling SetConfigModeCommand {enabled: %S}...\n", btoa(command.enabled));
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

    strncpy(nodeSettingsReport.node_name, settings.node_name, sizeof(nodeSettingsReport.node_name));
    strncpy(nodeSettingsReport.node_contact, settings.node_contact, sizeof(nodeSettingsReport.node_contact));

    nodeSettingsReport.location_lat = settings.location_lat;
    nodeSettingsReport.location_long = settings.location_long;

    // TODO: Check for GPS sensor availability
    nodeSettingsReport.location_auto_update_active = false;

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