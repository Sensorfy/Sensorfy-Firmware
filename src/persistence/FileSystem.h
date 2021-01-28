#pragma once

#include <LittleFS.h>

class FileSystem
{
private:
    FS *_fs{&LittleFS};

    void printDirContentsToDebug(const char *path, uint8_t level = 0);

public:
    void mount();
    void unmount();

    FS *getUnderlyingFs() { return _fs; }
};