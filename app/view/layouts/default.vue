<style scoped>

</style>

<script>
  import Navigation from '../components/navigation';

  export default {
    name: 'Default',
    components: {
      Navigation
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      }
    }
  };
</script>

<template>
  <v-app>
    <Navigation :user="user" />
    <nuxt />
  </v-app>
</template>