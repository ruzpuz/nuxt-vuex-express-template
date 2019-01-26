export default {
  state: {
    rolesObject: {},
    roles: []
  },
  mutations: {
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_ROLES_OBJECT(state, rolesObject) {
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