#include "FileSystem.h"

#include "debug.h"

void FileSystem::mount()
{
    DEBUG_PRINTLN(F("Mounting file system..."));

    _fs.begin();

#if DEBUG_ENABLED
    // Print filesystem info
    FSInfo fsInfo;
    _fs.info(fsInfo);
    DEBUG_PRINTF("%d of %d bytes used (%.2f%%), max path length: %d, max open files: %d\n",
                 fsInfo.usedBytes, fsInfo.totalBytes, ((float)fsInfo.usedBytes / fsInfo.totalBytes) * 100.0f,
                 fsInfo.maxPathLength, fsInfo.maxOpenFiles);

    // List stored files
    Dir rootDir = _fs.openDir("/");
    // TODO: List files recursively as soon as there are any to test with...
#endif
}

void FileSystem::unmount()
{
    DEBUG_PRINTLN(F("Unmounting file system..."));

    _fs.end();
}