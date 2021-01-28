#pragma once

#include <Stream.h>
#include <pb.h>

class ProtobufClass
{
private:
    static bool readCallback(pb_istream_t *istream, pb_byte_t *buf, size_t count);
    static bool writeCallback(pb_ostream_t *ostream, const pb_byte_t *buf, size_t count);

public:
    bool decode(Stream &stream, const pb_msgdesc_t *fields, void *dest_struct);
    bool decode(const pb_byte_t *src_buf, size_t src_buf_size, const pb_msgdesc_t *fields, void *dest_struct);
    bool decode(pb_istream_t *istream, const pb_msgdesc_t *fields, void *dest_struct);

    size_t encode(Print &print, const pb_msgdesc_t *fields, const void *src_struct);
    size_t encode(pb_byte_t *dest_buf, size_t dest_buf_size, const pb_msgdesc_t *fields, const void *src_struct);
    size_t encode(pb_ostream_t *ostream, const pb_msgdesc_t *fields, const void *src_struct);
};

extern ProtobufClass Protobuf;