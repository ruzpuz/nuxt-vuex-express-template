export default {
  namespaced: true,
  state: {
    rolesObject: {},
    roles: []
  },
  mutations: {
    async SET_ROLES(state, get) {
      const rolesObject = { NOT_LOGGED_IN: -1 };

      const { data } = await get('/api/roles');
      data.roles.forEach(function (role) {
        rolesObject[role.name.toUpperCase()] = role.id;
      });
      state.roles = data.roles;
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
  actions: {}
};