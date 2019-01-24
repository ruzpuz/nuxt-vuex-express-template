<template>
  <v-card v-if="success">
    <v-card-title>
      SUCCESS
      <v-spacer />
      <check-icon fill-color="green" />
    </v-card-title>
    <v-divider />
    <v-card-text>
      Successfully confirmed registration. Proceed to login
    </v-card-text>
  </v-card>
  <v-card v-else>
    <v-card-title>
      NO USER FOUND
      <v-spacer />
      <close-icon fill-color="red" />
    </v-card-title>
    <v-divider />
    <v-card-text>
      There is no user to be confirmed in the database
    </v-card-text>
  </v-card>
</template>

<script>
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import CheckIcon from 'vue-material-design-icons/Check.vue';

  export default {
    layout: 'access',
    name: 'ConfirmId',
    components: {
      CloseIcon, CheckIcon
    },
    async asyncData({ $axios: http, params }) {
      try {
        await http.post('/api/confirm', { confirmationToken: params.id });
        return { success: true };
      } catch(error) {
        return { success: false };
      }
    },
    data() {
      return {
        success: false
      };
    },
    created() {
      setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 1000);
    }
  };
</script>

<style scoped>

</style>