import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      variations: false
    },
    themes: {
      light: {
        primary: colors.indigo.base,
        secondary: colors.indigo.lighten3,
        accent: colors.amber.base,
        error: colors.deep - colors.orange.base,
        warning: colors.orange.base,
        info: colors.light - colors.blue.base,
        success: colors.light - colors.green.base
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg',
  }
});
