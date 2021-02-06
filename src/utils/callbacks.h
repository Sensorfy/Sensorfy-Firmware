#pragma once

#include <functional>

#include "proto/commands.pb.h"

typedef std::function<void()> ClientConnectedHandler;
typedef std::function<void(Command &command)> CommandReceivedHandler;