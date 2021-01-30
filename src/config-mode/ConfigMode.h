#pragma once

#include "persistence/FileSystem.h"
#include "persistence/NodeConfig.h"
#include "hardware/InternalDigitalPortExpander.h"

class ConfigMode
{
private:
    FileSystem *_fileSystem;
    NodeConfig *_nodeConfig;
    InternalDigitalPortExpander *_internalDigitalPortExpander;

    bool _enabled{false};

    void startWiFiAccessPoint();
    void stopWiFiAccessPoint();

public:
    ConfigMode(FileSystem *fileSystem, NodeConfig *nodeConfig, InternalDigitalPortExpander *internalDigitalPortExpander);

    void enable();
    void disable();
};