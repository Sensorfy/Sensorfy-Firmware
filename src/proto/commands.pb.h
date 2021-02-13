/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.4 */

#ifndef PB_PROTO_COMMANDS_PB_H_INCLUDED
#define PB_PROTO_COMMANDS_PB_H_INCLUDED
#include <pb.h>

#if PB_PROTO_HEADER_VERSION != 40
#error Regenerate this file with the current version of nanopb generator.
#endif

/* Struct definitions */
typedef struct _SetConfigModeCommand {
    bool enabled;
} SetConfigModeCommand;

typedef struct _SetNodeSettingsCommand {
    char node_name[33];
    char node_contact[33];
    float location_lat;
    float location_long;
    char wifi_password[17];
    uint32_t wake_interval;
} SetNodeSettingsCommand;

typedef struct _Command {
    pb_size_t which_command;
    union {
        SetConfigModeCommand setConfigModeCommand;
        SetNodeSettingsCommand setNodeSettingsCommand;
    } command;
} Command;


#ifdef __cplusplus
extern "C" {
#endif

/* Initializer values for message structs */
#define Command_init_default                     {0, {SetConfigModeCommand_init_default}}
#define SetConfigModeCommand_init_default        {0}
#define SetNodeSettingsCommand_init_default      {"", "", 0, 0, "", 0}
#define Command_init_zero                        {0, {SetConfigModeCommand_init_zero}}
#define SetConfigModeCommand_init_zero           {0}
#define SetNodeSettingsCommand_init_zero         {"", "", 0, 0, "", 0}

/* Field tags (for use in manual encoding/decoding) */
#define SetConfigModeCommand_enabled_tag         1
#define SetNodeSettingsCommand_node_name_tag     1
#define SetNodeSettingsCommand_node_contact_tag  2
#define SetNodeSettingsCommand_location_lat_tag  3
#define SetNodeSettingsCommand_location_long_tag 4
#define SetNodeSettingsCommand_wifi_password_tag 5
#define SetNodeSettingsCommand_wake_interval_tag 6
#define Command_setConfigModeCommand_tag         1
#define Command_setNodeSettingsCommand_tag       2

/* Struct field encoding specification for nanopb */
#define Command_FIELDLIST(X, a) \
X(a, STATIC,   ONEOF,    MESSAGE,  (command,setConfigModeCommand,command.setConfigModeCommand),   1) \
X(a, STATIC,   ONEOF,    MESSAGE,  (command,setNodeSettingsCommand,command.setNodeSettingsCommand),   2)
#define Command_CALLBACK NULL
#define Command_DEFAULT NULL
#define Command_command_setConfigModeCommand_MSGTYPE SetConfigModeCommand
#define Command_command_setNodeSettingsCommand_MSGTYPE SetNodeSettingsCommand

#define SetConfigModeCommand_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, BOOL,     enabled,           1)
#define SetConfigModeCommand_CALLBACK NULL
#define SetConfigModeCommand_DEFAULT NULL

#define SetNodeSettingsCommand_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, STRING,   node_name,         1) \
X(a, STATIC,   SINGULAR, STRING,   node_contact,      2) \
X(a, STATIC,   SINGULAR, FLOAT,    location_lat,      3) \
X(a, STATIC,   SINGULAR, FLOAT,    location_long,     4) \
X(a, STATIC,   SINGULAR, STRING,   wifi_password,     5) \
X(a, STATIC,   SINGULAR, UINT32,   wake_interval,     6)
#define SetNodeSettingsCommand_CALLBACK NULL
#define SetNodeSettingsCommand_DEFAULT NULL

extern const pb_msgdesc_t Command_msg;
extern const pb_msgdesc_t SetConfigModeCommand_msg;
extern const pb_msgdesc_t SetNodeSettingsCommand_msg;

/* Defines for backwards compatibility with code written before nanopb-0.4.0 */
#define Command_fields &Command_msg
#define SetConfigModeCommand_fields &SetConfigModeCommand_msg
#define SetNodeSettingsCommand_fields &SetNodeSettingsCommand_msg

/* Maximum encoded size of messages (where known) */
#define Command_size                             104
#define SetConfigModeCommand_size                2
#define SetNodeSettingsCommand_size              102

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif
