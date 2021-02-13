<template>
  <v-app>
    <v-app-bar app color="primary" dark elevate-on-scroll>
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="@/assets/logo-white.svg" height="30"
             position="center left"/>

      <v-spacer/>

      <v-btn text @click="$remote.setConfigMode(false)">
        Disable Config Mode
        <v-icon right>{{ mdiWifiOff }}</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs centered show-arrows v-model="activeTab">
          <v-tab>Node</v-tab>
          <v-tab>LoRaWAN</v-tab>
          <v-tab>Sensors</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-tabs-items v-model="activeTab" class="transparent">
        <v-tab-item>
          <node-view/>
        </v-tab-item>
        <v-tab-item>
          LoRaWAN
        </v-tab-item>
        <v-tab-item>
          Sensors
        </v-tab-item>
      </v-tabs-items>
    </v-main>

    <v-overlay opacity="0.8" :value="!$remote.connected || !$remote.nodeSettings" class="text-center">
      <v-progress-circular indeterminate size="50"/>
      <p class="mt-8">Connecting to node, please wait…</p>
    </v-overlay>

    <v-snackbar v-model="snackbar.visible" :timeout="5000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mdiWifiOff } from '@mdi/js';
import { EVENT_SEND_ERROR, EVENT_DECODE_ERROR } from '@/remote';
import NodeView from '@/components/NodeView';

export default {
  name: 'App',

  components: {
    NodeView
  },

  data: () => ({
    activeTab: null,
    snackbar: {
      visible: false,
      text: null
    },
    mdiWifiOff
  }),

  created () {
    this.$remote.$on([EVENT_SEND_ERROR, EVENT_DECODE_ERROR], errorMessage => {
      this.snackbar.text = errorMessage;
      this.snackbar.visible = true;
    });
  }
};
</script>
