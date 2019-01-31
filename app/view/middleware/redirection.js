export default function({ store, route, req, redirect, app }) {
  function isAccessRoute() {
    return (
      route.name && (
        route.name.startsWith('login') ||
        route.name.startsWith('confirm-id') ||
        route.name.startsWith('registration')
      )
    );
  }
  function isRouteSecure() {
    return (
      route.name && (
        route.name.startsWith('dashboard')
      )
    );
  }

  function securityRedirection() {
    if(route.fullPath === '/') {
      return redirect(app.localePath({ name: 'index' }));
    }
    if(isAccessRoute(route) && store.getters['login/isLoggedIn']) {
      return redirect(app.localePath({ name: 'dashboard' }));
    }
    if(isRouteSecure(route) && !store.getters['login/isLoggedIn']) {
      return redirect(app.localePath({ name: 'login' }));
    }
  }
  function languageSwitchRedirection() {

    if(!route.name) {
      return;
    }
    const { i18n } = app;
    const selected = store.getters['languages/getSelected'];
    const originalName = route.name.split(i18n.routesNameSeparator)[0];
    const newName = originalName + i18n.routesNameSeparator + selected;

    if(route.name !== newName) {
      redirect({
        name: newName,
        params: route.params,
        query: route.query,
        meta: route.meta
      });
    }
  }

  if(!process.server && !req) {
    return;
  }


  languageSwitchRedirection();
  securityRedirection();

}