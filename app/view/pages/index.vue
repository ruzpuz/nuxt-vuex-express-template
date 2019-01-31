<style scoped>

</style>
<script>

  export default {
    name: 'Index',
    nuxtI18n: {
      paths: {
        en: '/',
        rs: '/'
      }
    },
    data() {
      return {
        user: {}
      };
    },
    computed: {
      fullName() {
        return this.user.firstName + ' ' + this.user.lastName;
      }
    },
    methods: {
      navigateToLogin() {
        this.$router.push(this.localePath({ name: 'login' }));
      }
    },
    asyncData(context) {
      return { user: context.store.getters['login/getUser'] };
    }
  };
</script>

<template>
  <div>
    <h1> Hello world </h1>

    <p v-if="user.id">
      Hello {{ fullName }} The party is in the
    </p>
    <p v-else>
      Nothing to see here, party is in the
    </p>
    <p>
      <v-btn
        flat
        outline
        @click="navigateToLogin">
        secured area
      </v-btn>
    </p>
  </div>
</template>

