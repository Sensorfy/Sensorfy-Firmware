#include "Protobuf.h"

#include <pb_encode.h>
#include <pb_decode.h>

#include "debug.h"

ProtobufClass Protobuf;

bool ProtobufClass::readCallback(pb_istream_t *istream, pb_byte_t *buf, size_t count)
{
    // Anything to read?
    if (count == 0)
        return true;

    // Retrieve the stream to read from
    Stream *stream = reinterpret_cast<Stream *>(istream->state);

    // Read some bytes
    size_t read = stream->readBytes(buf, count);

    // End of stream reached?
    if (read == 0)
    {
        istream->bytes_left = 0;
        return false;
    }

    return read == count;
}

bool ProtobufClass::writeCallback(pb_ostream_t *ostream, const pb_byte_t *buf, size_t count)
{
    // Anything to write?
    if (count == 0)
        return true;

    // Retrieve the print target to write to
    Print *print = reinterpret_cast<Print *>(ostream->state);

    // Write some bytes
    size_t written = print->write(buf, count);

    return written == count;
}

bool ProtobufClass::decode(Stream &stream, const pb_msgdesc_t *fields, void *dest_struct)
{
    pb_istream_s istream = {readCallback, &stream, SIZE_MAX, 0};
    return decode(&istream, fields, dest_struct);
}

bool ProtobufClass::decode(const pb_byte_t *src_buf, size_t src_buf_size, const pb_msgdesc_t *fields, void *dest_struct)
{
    pb_istream_s istream = pb_istream_from_buffer(src_buf, src_buf_size);
    return decode(&istream, fields, dest_struct);
}

bool ProtobufClass::decode(pb_istream_t *istream, const pb_msgdesc_t *fields, void *dest_struct)
{
    bool result = pb_decode(istream, fields, dest_struct);

    if (!result)
    {
        DEBUG_PRINTF("Decoding protobuf failed. Error: %s\n", istream->errmsg);
    }

    return result;
}

size_t ProtobufClass::encode(Print &print, const pb_msgdesc_t *fields, const void *src_struct)
{
    pb_ostream_s ostream = {writeCallback, &print, SIZE_MAX, 0, 0};
    return encode(&ostream, fields, src_struct);
}

size_t ProtobufClass::encode(pb_byte_t *dest_buf, size_t dest_buf_size, const pb_msgdesc_t *fields, const void *src_struct)
{
    pb_ostream_s ostream = pb_ostream_from_buffer(dest_buf, dest_buf_size);
    return encode(&ostream, fields, src_struct);
}

size_t ProtobufClass::encode(pb_ostream_t *ostream, const pb_msgdesc_t *fields, const void *src_struct)
{
    if (pb_encode(ostream, fields, src_struct))
    {
        DEBUG_PRINTF("Encoded data as %d bytes.\n", ostream->bytes_written);
        return ostream->bytes_written;
    }
    else
    {
        DEBUG_PRINTF("Encoding data failed. Error: %s\n", ostream->errmsg);
        return false;
    }
}
