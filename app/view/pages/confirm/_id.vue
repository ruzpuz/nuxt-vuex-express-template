<template>
  <div>
    <v-card v-if="success">
      <v-card-title>
        SUCCESS
        <v-spacer />
        <i class="material-icons icon-success">
          check
        </i>
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
        <i class="material-icons icon-error">
          close
        </i>
      </v-card-title>
      <v-divider />
      <v-card-text>
        There is no user to be confirmed in the database
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    layout: 'access',
    name: 'ConfirmId',

    async asyncData({ params }) {
      try {
        await this.$store.dispatch('DO_CONFIRM_REGISTRATION', { confirmationToken: params.id });
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
  .icon-success { color:green }
  .icon-error { color:red }
</style>