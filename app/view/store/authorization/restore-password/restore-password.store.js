export default {
  namespaced: true,
  actions: {
    /* eslint-disable-next-line no-unused-vars */
    SHOULD_REDIRECT({ commit }, restorationToken) {
      const { get } = this.$axios;

      return get(`/api/restore-password/${restorationToken}/check`);
    },
    /* eslint-disable-next-line no-unused-vars */
    DO_RESTORE_PASSWORD({ commit }, body) {
      const { post } = this.$axios;

      return post('/api/restore-password', body);
    }
  }
};