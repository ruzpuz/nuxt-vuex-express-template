export default {
  namespaced: true,
  state: {
    selectedLanguage: ''
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
    getSelectedLanguage(state) {
      return state.selectedLanguage;
    },
    getRoles(state) {
      return state.roles;
    }
  },
  actions: {
    DO_SELECT_LANGUAGE() {}
  }
};