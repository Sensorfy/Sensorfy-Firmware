#pragma once

#include <LittleFS.h>

class FileSystem
{
private:
    FS _fs = LittleFS;

public:
    void mount();
    void unmount();

    FS *getUnderlyingFs() { return &_fs; }
};