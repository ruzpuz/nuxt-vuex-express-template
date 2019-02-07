export default {
  namespaced: true,
  actions: {
    /* eslint-disable-next-line no-unused-vars */
    async DO_REQUEST_RESTORATION({ commit }, { email }) {
      const { post } = this.$axios;

      await post('/api/forgot-password', { email });
    }
  }
};