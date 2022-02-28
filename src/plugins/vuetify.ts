import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from 'vuetify/src/locale/fr';
import en from 'vuetify/src/locale/en';
import colors from 'vuetify/lib/util/colors'

import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'// don't forget to import CSS styles
import 'vuetify/dist/vuetify.min.css'// Vuetify's CSS styles 

const vuetify: Vuetify = new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',

        cPrimary2: '#e0e0e0',
        cProfile: "#01c643",
        cSocial: "#ffc526",
        cShop: "#a4674b",
        cSettings: "#db4044",
        cPlay: "#00a1c6",
        cMulti: "#b566d9",
        cFacebook: "#0178ee",
        cGoogle: "#ff381b",
        cGithub: "#000000",
        cFontEmail: '#bd4b52'

    },
      dark: {
        primary: '#3f51b5',//424242 272727
        secondary: '#9C27b0',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    },
  },
    lang: {
      locales: { fr, en },
      current: 'fr',
    },
});

Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
})

export default vuetify;
