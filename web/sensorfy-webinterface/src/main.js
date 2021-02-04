import Vue from 'vue';

// Import all fonts for development purposes:
// import 'roboto-fontface/css/roboto/roboto-fontface.css'

import 'roboto-fontface/css/roboto/sass/roboto-fontface-regular.scss';
import 'roboto-fontface/css/roboto/sass/roboto-fontface-medium.scss';
import 'roboto-fontface/css/roboto/sass/roboto-fontface-bold.scss';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import remote from './remote';

Vue.config.productionTip = false;

Vue.prototype.$remote = remote;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
