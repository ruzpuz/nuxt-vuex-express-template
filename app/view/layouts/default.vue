<style scoped>

</style>

<script>
  import Navigation from '../components/navigation';

  export default {
    components: {
      Navigation
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      }
    },
    name: "default"
  }
</script>

<template>
    <v-app>
        <Navigation :user="user"/>
        <nuxt/>
    </v-app>
</template>