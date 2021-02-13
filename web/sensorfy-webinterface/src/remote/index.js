import Vue from 'vue';
import { Command, Report } from '@/proto';

// Event names
export const EVENT_SEND_ERROR = 'send-error';
export const EVENT_DECODE_ERROR = 'decode-error';

const webSocketUrl = localStorage.getItem('sensorfy_websocketUrl') || `ws://${window.location.host}/ws`;

export default new Vue({
  data: () => ({
    websocket: null,
    connected: false,
    nodeSettings: null
  }),

  methods: {
    reconnect () {
      this.connected = false;
      if (this.websocket) {
        this.websocket.close();
      }

      this.websocket = new WebSocket(webSocketUrl);
      this.websocket.binaryType = 'arraybuffer';
      this.websocket.onopen = () => {
        this.connected = true;
      };
      this.websocket.onclose = () => {
        this.connected = false;
        setTimeout(() => this.reconnect(), 3000);
      };
      this.websocket.onmessage = message => {
        // Ensure the message is binary
        if (!(message.data instanceof ArrayBuffer)) {
          return;
        }

        // Decode the message
        let report;
        try {
          report = Report.decode(new Uint8Array(message.data));
        } catch (e) {
          this.$emit(EVENT_DECODE_ERROR, `Decoding a received report failed: ${e}`);
          return;
        }

        // Process the report
        this.processReport(report);
      };
    },
    processReport (report) {
      if (report.nodeSettingsReport) {
        this.nodeSettings = report.nodeSettingsReport;
      }
    },
    sendCommand (command) {
      // Create a protobuf message
      const message = Command.create(command);

      // Verify the message
      const error = Command.verify(message);
      if (error) {
        this.$emit(EVENT_SEND_ERROR, `Verification of command message failed: ${error}`);
        return;
      }

      // Encode and send the message
      const buffer = Command.encode(message).finish();
      this.websocket.send(buffer);
    },
    setConfigMode (enabled) {
      this.sendCommand({
        setConfigModeCommand: {
          enabled
        }
      });
    },
    setNodeSettings (settings) {
      this.sendCommand({
        setNodeSettingsCommand: {
          ...settings
        }
      });
    }
  },

  created () {
    this.reconnect();
  }
});
