export default async function ({ store, req }) {

  if (!process.server && !req) {
    return;
  }

  const loggedUser = req.headers.security;
  await store.dispatch('common/DO_SET_ROLES');
  if(loggedUser.roleId === store.getters['common/getRolesObject'].NOT_LOGGED_IN) {
    store.commit('login/LOGOUT');
  } else {
    store.commit('login/LOGIN', loggedUser);
  }

}
