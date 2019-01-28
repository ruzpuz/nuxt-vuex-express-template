export default async function ({ store, route, req, redirect, app }) {
  if (!process.server && !req) {
    return;
  }

  function resolveRoute(user) {
    if(route.fullPath === '/') {
      return redirect(app.localePath({ name: 'index' }));
    }
    if(route.name.startsWith('login') ||
      route.name.startsWith('confirm-id') ||
      route.name.startsWith('registration') ||
      route.name.startsWith('index')) {
      if(store.getters.isLoggedIn) {
        return redirect(app.localePath({ name: 'dashboard' }));
      }
    } else {
      if(!store.getters.isLoggedIn) {
        return redirect(app.localePath({ name: 'login' }));
      }

      if(route.name.startsWith('portal-users') && user.roleId !== store.getters.getRolesObject.ADMINISTRATOR) {
        return redirect(app.localePath({ name: 'not-found' }));
      }

    }
  }

  resolveRoute(store.getters.getUser);


}