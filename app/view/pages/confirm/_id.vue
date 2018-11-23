<template>
    <div>
        <div v-if="success">
           SUCCESS
        </div>
        <div v-else>
           NO USER FOUND
        </div>
    </div>
</template>

<script>
  export default {
    layout: 'access',
    name: 'confirm-id',
    async asyncData({ $axios: http, params, redirect }) {
      try {
        const { data } = await http.post('/api/confirm', { confirmationToken: params.id });
        return { success: true };
      } catch(error) {
        return { success: false };
      }
    },
    data() {
      return {
        success: false
      }
    },
    created() {
      setTimeout(() => {
        this.$router.push({ name: 'login'})
      }, 1000)
    }
  };
</script>

<style scoped>

</style>