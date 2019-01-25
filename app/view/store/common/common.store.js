import { post } from 'axios';

export default {
  state: {
    user: {},
    rolesObject: {},
    roles: []
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = {};
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_ROLES_OBJECT(state, rolesObject) {
      state.rolesObject = rolesObject;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return Object.keys(state.user).length > 0;
    },
    getRolesObject(state) {
      return state.rolesObject;
    },
    getRoles(state) {
      return state.roles;
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