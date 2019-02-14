export default {
  namespaced: true,
  state: {
    rolesObject: {},
    roles: []
  },
  mutations: {
    async SET_ROLES(state, { roles, rolesObject }) {
      state.roles = roles;
      state.rolesObject = rolesObject;
    }
  },
  getters: {
    getRolesObject(state) {
      return state.rolesObject;
    },
    getRoles(state) {
      return state.roles;
    }
  },
  actions: {
    async DO_SET_ROLES({ commit }) {
      const { get } = this.$axios;
      const rolesObject = { NOT_LOGGED_IN: -1 };
      const { RANDOM_SECURITY } = process.env;

      const { data } = await get('/api/roles', { headers: { 'ks-security': RANDOM_SECURITY } });
      data.roles.forEach(function (role) {
        rolesObject[role.name.toUpperCase()] = role.id;
      });

      commit('SET_ROLES', { roles: data.roles, rolesObject } );
    }
  }
};