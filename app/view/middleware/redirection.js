export default async function ({ store, route, redirect }) {
  if (!process.server) {
    return;
  }

  function resolveRoute(user) {

    if(route.name === 'login' ||
      route.name === 'confirm-id'||
      route.name === 'registration'||
      route.name === 'index') {
      if(store.getters.isLoggedIn) {
        return redirect({ name: 'dashboard' });
      }
    } else {
      if(!store.getters.isLoggedIn) {
        return redirect({ name: 'login' });
      }

      if(route.name === 'portal-users' && user.roleId !== store.getters.getRolesObject.ADMINISTRATOR) {
        return redirect({ name: 'not-found' });
      }

    }
  }

  resolveRoute(store.getters.getUser);


}