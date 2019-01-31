<script>
  import 'material-design-icons-iconfont/dist/material-design-icons.css';
  import 'vuetify/dist/vuetify.min.css';

  import Vue from 'vue';
  import Vuetify from 'vuetify';

  Vue.use(Vuetify);

  export default {
    name: 'Access'
  };
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active { transition-property: opacity; transition-duration: 1s; }
  .fade-enter-active { transition-delay: .1s; }
  .fade-enter, .fade-leave-active { opacity: 0; }
</style>

<template>
  <v-app>
    <v-container>
      <v-layout
        align-center
        justify-center
        row
        fill-height>
        <v-flex
          xs12
          sm6>
          <transition name="fade">
            <nuxt />
          </transition>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>