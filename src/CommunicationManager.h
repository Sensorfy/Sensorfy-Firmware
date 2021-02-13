#pragma once

#include "proto/commands.pb.h"
#include "proto/reports.pb.h"
#include "config-mode/ConfigMode.h"
#include "persistence/NodeConfig.h"

enum CommunicationChannel
{
    LORAWAN = 1,
    CONFIG_MODE_WIFI = 1 << 1
};

class CommunicationManager
{
private:
    ConfigMode *_configMode;
    NodeConfig *_nodeConfig;

public:
    CommunicationManager(ConfigMode *configMode, NodeConfig *nodeConfig);

    void sendInitialConfigModeReports();

    void handleGenericCommand(Command &command, CommunicationChannel sourceChannel);
    void handleCommand(SetConfigModeCommand &command, CommunicationChannel sourceChannel);
    void handleCommand(SetNodeSettingsCommand &command, CommunicationChannel sourceChannel);

    void sendReport(Report &report, CommunicationChannel channels);
    void sendNodeSettingsReport(CommunicationChannel channels);
};