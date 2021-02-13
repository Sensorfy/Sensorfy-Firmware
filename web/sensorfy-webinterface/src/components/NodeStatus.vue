<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="text-break">{{ $remote.nodeSettings.nodeName }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="mb-n4 d-flex flex-wrap">
            <div class="flex-grow-1 mr-6">
              <span class="caption">Contact Person</span>
              <p class="font-weight-bold">{{ $remote.nodeSettings.nodeContact || 'Not specified' }}</p>
            </div>
            <div class="flex-grow-1">
              <span class="caption">Firmware Version</span>
              <p class="font-weight-bold">{{ $remote.nodeSettings.firmwareVersion }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col v-for="(powerCard, index) in powerCards" :key="`power-card-${index}`">
      <v-card :color="powerCard.color">
        <div class="d-flex flex-nowrap pa-3 white--text">
          <v-icon x-large class="align-self-center" color="white">{{ powerCard.icon }}</v-icon>
          <div class="px-3 align-self-center">
            <span class="caption text-no-wrap">{{ powerCard.caption }}</span>
            <p class="mb-0 font-weight-bold text-no-wrap">{{ powerCard.text }}</p>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiBatteryOutline,
  mdiBattery10,
  mdiBattery20,
  mdiBattery30,
  mdiBattery40,
  mdiBattery50,
  mdiBattery60,
  mdiBattery70,
  mdiBattery80,
  mdiBattery90,
  mdiBattery,
  mdiWhiteBalanceSunny,
  mdiUsb
} from '@mdi/js';

export default {
  name: 'NodeStatus',

  data: () => ({
    batteryVoltage: 3.1,
    batteryPercent: 61,
    mdiWhiteBalanceSunny,
    mdiUsb
  }),

  computed: {
    batteryIcon () {
      if (this.batteryPercent >= 95) {
        return mdiBattery;
      } else if (this.batteryPercent >= 90) {
        return mdiBattery90;
      } else if (this.batteryPercent >= 80) {
        return mdiBattery80;
      } else if (this.batteryPercent >= 70) {
        return mdiBattery70;
      } else if (this.batteryPercent >= 60) {
        return mdiBattery60;
      } else if (this.batteryPercent >= 50) {
        return mdiBattery50;
      } else if (this.batteryPercent >= 40) {
        return mdiBattery40;
      } else if (this.batteryPercent >= 30) {
        return mdiBattery30;
      } else if (this.batteryPercent >= 20) {
        return mdiBattery20;
      } else if (this.batteryPercent >= 10) {
        return mdiBattery10;
      } else {
        return mdiBatteryOutline;
      }
    },
    batteryColor () {
      if (this.batteryPercent >= 40) {
        return 'green';
      } else if (this.batteryPercent >= 10) {
        return 'orange';
      } else {
        return 'red';
      }
    },
    powerCards () {
      return [
        {
          icon: this.batteryIcon,
          color: this.batteryColor,
          caption: 'Battery Charge',
          text: `${this.batteryVoltage}V - ${this.batteryPercent}%`
        },
        {
          icon: mdiWhiteBalanceSunny,
          color: 'yellow darken-3',
          caption: 'Solar Power',
          text: '30mW'
        },
        {
          icon: mdiUsb,
          color: 'blue darken-2',
          caption: 'USB Power',
          text: '5V - 100mA'
        }
      ];
    }
  }
};
</script>
