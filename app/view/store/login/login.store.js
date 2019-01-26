import { post } from 'axios';

export default {
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
      try {
        const { data } = await post('/api/login', secret);

        commit('LOGIN', data.user);

        return data;
      } catch(error) {
        throw error;
      }
    },
    async DO_FACEBOOK_LOGIN({ commit }, { secret }) {
      try {
        const { data } = await post('/api/login/facebook', secret);

        commit('LOGIN', data.user);

        return data;
      } catch(error) {
        throw error;
      }
    }
  }
};