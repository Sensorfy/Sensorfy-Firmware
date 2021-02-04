#include "CommandHandler.h"

#include <functional>

#include "utils/utils.h"
#include "utils/debug.h"

CommandHandler::CommandHandler(ConfigMode *configMode) : _configMode{configMode}
{
    _configMode->onCommandReceived(std::bind(&CommandHandler::handleGenericCommand, this, std::placeholders::_1));
}

void CommandHandler::handleGenericCommand(Command &command)
{
    // Handle the command based on the value of the oneof-feature
    switch (command.which_command)
    {
    case Command_setConfigModeCommand_tag:
        handleCommand(command.command.setConfigModeCommand);
        break;
    }
}

void CommandHandler::handleCommand(SetConfigModeCommand &command)
{
    DEBUG_PRINTF("Handling SetConfigModeCommand {enabled: %S}...\n", btoa(command.enabled));
}