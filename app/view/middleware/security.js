export default async function ({ store, req, $axios }) {

  if (!process.server && !req) {
    return;
  }

  const loggedUser = req.headers.security;
  const rolesObject = { NOT_LOGGED_IN: -1 };
  const { data } = await $axios.get('/api/roles');

  data.roles.forEach(function (role) {
    rolesObject[role.name.toUpperCase()] = role.id;
  });

  await store.commit('SET_ROLES', data.roles);
  await store.commit('SET_ROLES_OBJECT', rolesObject);

  if(loggedUser.roleId === store.state.rolesObject.NOT_LOGGED_IN) {
    store.commit('LOGOUT');
  } else {
    store.commit('LOGIN', loggedUser);
  }

}
