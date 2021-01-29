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

      <v-spacer />

      <v-btn text>
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
  </v-app>
</template>

<script>
import { mdiWifiOff } from "@mdi/js";

export default {
  name: "App",

  components: {},

  data: () => ({
    mdiWifiOff,
  }),
};
</script>
