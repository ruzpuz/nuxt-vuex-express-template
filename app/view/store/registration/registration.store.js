export default {
  namespaced: true,
  actions: {
    /* eslint-disable-next-line no-unused-vars */
    async DO_REGISTER({ commit, rootGetters: getters }, user) {
      const { post } = this.$axios;

      return this.$axios.post('/api/registration', user);
    },
    /* eslint-disable-next-line no-unused-vars */
    DO_CONFIRM_REGISTRATION({ commit, rootGetters: getters }, { confirmationToken }) {
      const { post } = this.$axios;

      return post('/api/confirm', { confirmationToken });
    }
  }
};