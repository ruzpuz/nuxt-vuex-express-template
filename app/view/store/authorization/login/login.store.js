import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = {};
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return Object.keys(state.user).length > 0;
    }
  },
  actions: {
    async DO_LOGIN({ commit }, { secret }) {
      const { post } = this.$axios;

      const { data } = await post('/api/login', secret);
      Cookies.set('ks-security', data['ks-security'], { path: '/' });

      commit('LOGIN', data.user);
    },
    async DO_FACEBOOK_LOGIN({ commit }, { secret }) {
      const { post } = this.$axios;

      const { data } = await post('/api/login/facebook', secret);
      Cookies.set('ks-security', data['ks-security'], { path: '/' });

      commit('LOGIN', data.user);
    }
  }
};