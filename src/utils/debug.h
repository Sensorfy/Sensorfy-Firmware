#pragma once

#include <Esp.h>

#if DEBUG_ENABLED
#include <SoftwareSerial.h>
extern SoftwareSerial Debug;
#endif

// Macro that prints the debug log prefix with file and line number
#if DEBUG_ENABLED
#define DEBUG_PRINT_PREFIX() \
    Debug.printf_P(PSTR("[%07lu %S:%d] "), millis(), F(__FILE__), __LINE__)
#else
#define DEBUG_PRINT_PREFIX()
#endif

// Macro that prints a debug message to the log
#if DEBUG_ENABLED
#define DEBUG_PRINTLN(message) \
    DEBUG_PRINT_PREFIX();      \
    Debug.println(message)
#else
#define DEBUG_PRINTLN(message)
#endif

// Macro that prints a formatted debug message to the log
#if DEBUG_ENABLED
#define DEBUG_PRINTF(fmt, ...) \
    DEBUG_PRINT_PREFIX();      \
    Debug.printf_P(PSTR(fmt), ##__VA_ARGS__)
#else
#define DEBUG_PRINTF(fmt, ...)
#endif

// Macro for assertions
#if DEBUG_ENABLED
#define DEBUG_ASSERT(exp)                              \
    if (!(exp))                                        \
    {                                                  \
        DEBUG_PRINTF("Assertion failed: %S", F(#exp)); \
        delay(1000);                                   \
        ESP.restart();                                 \
    }
#else
#define DEBUG_ASSERT(exp)
#endif