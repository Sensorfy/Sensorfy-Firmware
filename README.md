# Sensorfy Firmware

## How to build

### Regenerating protobuf definitions

The required protobuf definitions are already pushed as part of this repository. But in case you want to update or regenerate them, use the following command to do so:

```
# Requirements: pip install nanopb grpcio-tools
nanopb_generator --output-dir=src proto/*.proto
```