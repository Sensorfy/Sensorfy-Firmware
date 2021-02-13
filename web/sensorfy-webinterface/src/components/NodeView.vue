<template>
  <v-fade-transition>
    <v-container v-if="$remote.nodeSettings">
      <node-status/>
      <node-settings-form/>
    </v-container>
  </v-fade-transition>
</template>

<script>
import NodeStatus from '@/components/NodeStatus';
import NodeSettingsForm from '@/components/NodeSettingsForm';

export default {
  name: 'NodeView',

  components: {
    NodeSettingsForm,
    NodeStatus
  }
};
</script>
