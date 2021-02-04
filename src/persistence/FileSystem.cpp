#include "FileSystem.h"

#include "utils/debug.h"

void FileSystem::printDirContentsToDebug(const char *path, uint8_t level)
{
#if DEBUG_ENABLED
    Dir dir = _fs->openDir(path);

    while (dir.next())
    {
        if (dir.isDirectory())
        {
            DEBUG_PRINTF("%*s/%s\n", level * 2, "", dir.fileName().c_str());
            printDirContentsToDebug(dir.fileName().c_str(), level + 1);
        }
        else if (dir.isFile())
        {
            DEBUG_PRINTF("%*s/%s (%u bytes)\n", level * 2, "", dir.fileName().c_str(), dir.fileSize());
        }
    }
#endif
}

void FileSystem::mount()
{
    DEBUG_PRINTLN(F("Mounting file system..."));

    _fs->begin();

#if DEBUG_ENABLED
    // Print filesystem info
    FSInfo fsInfo;
    _fs->info(fsInfo);
    DEBUG_PRINTF("%u of %u bytes used (%.2f%%), max path length: %u, max open files: %u\n",
                 fsInfo.usedBytes, fsInfo.totalBytes, ((float)fsInfo.usedBytes / fsInfo.totalBytes) * 100.0f,
                 fsInfo.maxPathLength, fsInfo.maxOpenFiles);

    // List stored files
    printDirContentsToDebug("/");
#endif
}

void FileSystem::unmount()
{
    DEBUG_PRINTLN(F("Unmounting file system..."));

    _fs->end();
}