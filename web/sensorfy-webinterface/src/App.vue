<template>
  <v-app>
    <v-app-bar app color="primary" dark elevate-on-scroll>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo-white.svg"
        height="30"
        position="center left"
      />

      <v-spacer/>

      <v-btn text @click="$remote.setConfigMode(false)">
        Disable Config Mode
        <v-icon right>{{ mdiWifiOff }}</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs centered>
          <v-tab>Node</v-tab>
          <v-tab>LoRaWAN</v-tab>
          <v-tab>Sensors</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" lg="3" md="4">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" lg="9" md="8">
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-overlay opacity="0.8" :value="!$remote.connected" class="text-center">
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
import { EVENT_SEND_ERROR } from '@/remote';

export default {
  name: 'App',

  components: {},

  data: () => ({
    snackbar: {
      visible: false,
      text: null
    },
    mdiWifiOff
  }),

  created () {
    this.$remote.$on(EVENT_SEND_ERROR, errorMessage => {
      this.snackbar.text = errorMessage;
      this.snackbar.visible = true;
    });
  }
};
</script>
