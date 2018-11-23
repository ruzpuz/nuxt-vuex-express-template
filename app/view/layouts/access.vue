

<script>
  import 'material-design-icons-iconfont/dist/material-design-icons.css';
  import 'vuetify/dist/vuetify.min.css';

  import Vue from 'vue'
  import Vuetify from 'vuetify'

  Vue.use(Vuetify)

  export default {
    name: 'access'
  }
</script>

<style scoped>

</style>

<template>
    <v-app>
        <v-container>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 sm6>
                    <nuxt />
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>