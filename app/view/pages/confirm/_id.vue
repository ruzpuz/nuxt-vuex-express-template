<template>
  <div>
    <v-card v-if="success">
      <v-card-title>
        {{ $t('confirmationPage.SUCCESS_HEAD') }}
        <v-spacer />
        <i class="material-icons icon-success">
          check
        </i>
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t('confirmationPage.SUCCESS_MESSAGE') }}
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-title>
        {{ $t('confirmationPage.FAILURE_HEAD') }}
        <v-spacer />
        <i class="material-icons icon-error">
          close
        </i>
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t('confirmationPage.FAILURE_MESSAGE') }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    layout: 'access',
    name: 'ConfirmId',

    async asyncData({ params, store, $axios }) {
      try {
        await store.dispatch('registration/DO_CONFIRM_REGISTRATION', { post: $axios.post, confirmationToken: params.id });
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
        this.$router.push(this.localePath({ name: 'login' }));
      }, 1000);
    }
  };
</script>

<style scoped>
  .icon-success { color:green }
  .icon-error { color:red }
</style>