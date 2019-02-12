export default {
  namespaced: true,
  actions: {
    /* eslint-disable-next-line no-unused-vars */
    async SHOULD_REDIRECT({ commit }, restorationToken) {
      const { get } = this.$axios;

      await get(`/api/restore-password/${restorationToken}/check`);
    }
  }
};