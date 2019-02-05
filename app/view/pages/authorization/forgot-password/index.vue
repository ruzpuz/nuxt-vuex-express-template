<template>
  <div> forgot </div>
</template>

<script>
  export default {
    name: 'ForgotPassword',
    meta: { secure: false },
    layout: 'access',
    nuxtI18n: {
      paths: {
        rs: '/zaboravljena-lozinka',
        us: '/forgot-password'
      }
    }
  };
</script>

<style scoped>

</style>