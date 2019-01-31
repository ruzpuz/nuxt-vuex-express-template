export default async function ({ store, req, $axios }) {

  if (!process.server && !req) {
    return;
  }

  const loggedUser = req.headers.security;
  await store.commit('common/SET_ROLES', $axios.get);

  if(loggedUser.roleId === store.getters['common/getRolesObject'].NOT_LOGGED_IN) {
    store.commit('login/LOGOUT');
  } else {
    store.commit('login/LOGIN', loggedUser);
  }

}
