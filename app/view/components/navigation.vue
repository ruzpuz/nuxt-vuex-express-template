<script>

  import Cookies from 'js-cookie';

  export default {
    name: 'Navigation',
    props: {
      user: {
        type: Object,
        default: () => {}
      }
    },
    mounted() {

    },
    methods: {
      navigate(where) {
        this.$router.push({ name: where });
      },
      logout() {
        Cookies.remove('ks-security', { path: '/' });
        this.$router.push({ name: 'login' });
      }
    }
  };
</script>
<template>
  <div>
    hello {{ user.firstName }} this is navigation
  </div>
</template>


<style scoped>

</style>