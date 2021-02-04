import Vue from 'vue';
import { Command } from '@/proto';

// Event names
export const EVENT_SEND_ERROR = 'send-error';

const webSocketUrl = localStorage.getItem('sensorfy_websocketUrl') || `ws://${window.location.host}/ws`;

export default new Vue({
  data: () => ({
    websocket: null,
    connected: false
  }),

  methods: {
    reconnect () {
      this.connected = false;
      if (this.websocket) {
        this.websocket.close();
      }

      this.websocket = new WebSocket(webSocketUrl);
      this.websocket.onopen = () => {
        this.connected = true;
      };
      this.websocket.onclose = () => {
        this.connected = false;
        setTimeout(() => this.reconnect(), 3000);
      };
    },
    sendCommand (command) {
      // Create a protobuf message
      const message = Command.create(command);

      // Verify the message
      const error = Command.verify(message);
      if (error) {
        this.$emit(EVENT_SEND_ERROR, `Message verification failed: ${error}`);
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
    }
  },

  created () {
    this.reconnect();
  }
});
