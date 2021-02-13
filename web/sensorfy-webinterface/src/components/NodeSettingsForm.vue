<template>
  <v-row>
    <v-col cols="12">
      <v-card :loading="formSaving" :disabled="formSaving">
        <v-card-title class="text-break">Change the Node Settings</v-card-title>
        <v-card-subtitle>These are persistently stored on the node.</v-card-subtitle>
        <v-card-text>
          <v-form ref="nodeSettingsForm">
            <p class="subtitle-2">General</p>
            <v-text-field dense outlined label="Name of the node" required counter="32"
                          :rules="[rules.required, rules.max(32)]"
                          hint="Required, keep this short but descriptive!"
                          :value="getValue('nodeName')" @input="v => setValue('nodeName', v)"/>
            <v-text-field dense outlined label="Who is responsible for this node?" counter="32"
                          :rules="[rules.max(32)]" hint="Optional, name of a person or organization."
                          :value="getValue('nodeContact')" @input="v => setValue('nodeContact', v)"/>

            <p class="subtitle-2">Location</p>
            <p>This is where the node will be positioned on the map.</p>
            <div class="d-flex flex-wrap mx-n3">
              <v-text-field dense outlined label="Latitude" :rules="[rules.isNumber, rules.latitude]"
                            hint="Optional" type="number" class="mx-3"
                            :value="getValue('locationLat') || ''"
                            @input="v => setValue('locationLat', parseFloat(v) || 0)"/>
              <v-text-field dense outlined label="Longitude" :rules="[rules.isNumber, rules.longitude]"
                            hint="Optional" type="number" class="mx-3"
                            :value="getValue('locationLong') || ''"
                            @input="v => setValue('locationLong', parseFloat(v) || 0)"/>
            </div>
            <v-alert type="info" text dense class="mb-6">
              When GPS is available, the node location will be automatically set or overwritten.
            </v-alert>

            <p class="subtitle-2">Config Mode</p>
            <v-switch label="Use WiFi authentication (recommended)" :false-value="false" :true-value="true"
                      :input-value="getValue('wifiPasswordSet')" @change="v => setValue('wifiPasswordSet', v)"/>
            <v-expand-transition>
              <div v-if="getValue('wifiPasswordSet')" class="mt-n4">
                <v-switch label="Keep previous password" :disabled="!values.wifiPasswordSet" :false-value="false"
                          :true-value="true" :input-value="getValue('keepWifiPassword')"
                          @change="v => setValue('keepWifiPassword', v)"/>
                <v-expand-transition>
                  <div v-if="!getValue('keepWifiPassword')">
                    <v-text-field dense outlined label="WiFi password" required :rules="[rules.required, rules.min(8)]"
                                  hint="Required" type="password"
                                  :value="getValue('wifiPassword')" @input="v => setValue('wifiPassword', v)"/>
                    <v-text-field dense outlined label="WiFi password (repeat)" required
                                  :rules="[rules.required, rules.matches(getValue('wifiPassword'))]" type="password"
                                  :value="getValue('wifiPasswordRepeat')"
                                  @input="v => setValue('wifiPasswordRepeat', v)"/>
                  </div>
                </v-expand-transition>
              </div>
            </v-expand-transition>

            <p class="subtitle-2">Wake Interval</p>
            <p>Defines how often the node will wake from sleep and transmit its sensor data.</p>
            <v-text-field dense outlined label="Interval in seconds" required
                          :rules="[rules.required, rules.isNumber, rules.minNumber(60), rules.maxNumber(2592000)]"
                          type="number" step="1"
                          :value="getValue('wakeInterval')"
                          @input="v => setValue('wakeInterval', parseInt(v))"/>
            <div class="d-flex flex-wrap mx-n3">
              <div class="button-group mx-3 mb-4 flex-grow-1">
                <v-btn depressed color="primary" @click="changeWakeInterval(-86400)">-</v-btn>
                <span class="primary v-btn v-btn--has-bg v-size--default flex-grow-1">
                  {{ Math.floor(getValue('wakeInterval') / 86400) }} days
                </span>
                <v-btn depressed color="primary" @click="changeWakeInterval(86400)">+</v-btn>
              </div>
              <div class="button-group mx-3 mb-4 flex-grow-1">
                <v-btn depressed color="primary" @click="changeWakeInterval(-3600)">-</v-btn>
                <span class="primary v-btn v-btn--has-bg v-size--default flex-grow-1">
                  {{ Math.floor(getValue('wakeInterval') / 3600) % 24 }} hours
                </span>
                <v-btn depressed color="primary" @click="changeWakeInterval(3600)">+</v-btn>
              </div>
              <div class="button-group mx-3 mb-4 flex-grow-1">
                <v-btn depressed color="primary" @click="changeWakeInterval(-60)">-</v-btn>
                <span class="primary v-btn v-btn--has-bg v-size--default flex-grow-1">
                  {{ Math.floor(getValue('wakeInterval') / 60) % 60 }} minutes
                </span>
                <v-btn depressed color="primary" @click="changeWakeInterval(60)">+</v-btn>
              </div>
            </div>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3 pb-0 flex-wrap">
          <v-alert type="info" text dense class="mb-3">
            You may need to restart the node for some changes to take effect.
          </v-alert>
          <v-spacer/>
          <div class="ml-auto mb-3">
            <v-btn text color="primary" @click="changes = {}">Cancel</v-btn>
            <v-btn color="primary" @click="save()">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _ from 'lodash';
import * as rules from '@/utils/form-rules';

export default {
  name: 'NodeSettingsForm',

  data: () => ({
    formSaving: false,
    changes: {},
    rules
  }),

  computed: {
    values () {
      return {
        nodeName: this.$remote.nodeSettings.nodeName || '',
        nodeContact: this.$remote.nodeSettings.nodeContact || '',
        locationLat: this.$remote.nodeSettings.locationLat || 0,
        locationLong: this.$remote.nodeSettings.locationLong || 0,
        wifiPasswordSet: this.$remote.nodeSettings.wifiPasswordSet || false,
        keepWifiPassword: this.$remote.nodeSettings.wifiPasswordSet || false,
        wakeInterval: this.$remote.nodeSettings.wakeInterval || 3600
      };
    }
  },

  watch: {
    '$remote.nodeSettings': function () {
      if (this.formSaving) {
        this.changes = {};
        this.formSaving = false;
      }
    }
  },

  methods: {
    getValue (field) {
      return field in this.changes ? this.changes[field] : this.values[field];
    },
    setValue (field, value) {
      this.$set(this.changes, field, value);
    },
    changeWakeInterval (diff) {
      let value = this.getValue('wakeInterval');
      value += diff;
      if (value < 60 || value > 2592000) {
        return;
      }
      this.setValue('wakeInterval', value);
    },
    save () {
      if (!this.$refs.nodeSettingsForm.validate()) {
        return;
      }

      const nodeSettings = Object.assign(_.cloneDeep(this.values), this.changes);

      // Either both coordinates are set or both must be 0
      if (!nodeSettings.locationLat || !nodeSettings.locationLong) {
        nodeSettings.locationLat = nodeSettings.locationLong = 0;
      }

      // Encode the users choice in the wifiPassword-property
      if (!nodeSettings.wifiPasswordSet) {
        nodeSettings.wifiPassword = '';
      } else if (nodeSettings.keepWifiPassword) {
        nodeSettings.wifiPassword = 'keep'; // Shorter than 8 characters
      }

      this.$remote.setNodeSettings(nodeSettings);
      this.formSaving = true;
    }
  }
};
</script>

<style scoped lang="scss">
.button-group {
  display: inline-flex;

  .v-btn {
    border-radius: 0;
    margin: 0;
    min-width: auto;
    width: auto;

    &:not(:last-child) {
      border-right: 1px solid transparent;
    }

    &:first-child {
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
