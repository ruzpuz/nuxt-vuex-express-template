<script>

  import Cookies from 'js-cookie';
  const emailRegex = new RegExp('^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$');

  export default {
    name: "Navigation",
    props: [ 'user' ],
    mounted() {
      console.log(this.user)
    },
    methods: {
      navigate(where) {
        this.$router.push({ name: where })
      },
      logout() {
        Cookies.remove('ks-security', { path: '/' });
        this.$router.push({ name: 'login' })
      },
    },


  }
</script>
<template>
    <div>
        hello {{ user.firstName }} this is navigation
    </div>


</template>



<style scoped>

</style>