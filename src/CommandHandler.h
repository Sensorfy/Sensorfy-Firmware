#pragma once

#include "proto/commands.pb.h"
#include "config-mode/ConfigMode.h"

class CommandHandler
{
private:
    ConfigMode *_configMode;

public:
    CommandHandler(ConfigMode *configMode);

    void handleGenericCommand(Command &command);

    void handleCommand(SetConfigModeCommand &command);
};