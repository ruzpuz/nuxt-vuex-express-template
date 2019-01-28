function isAccessRoute(route) {
  return (
    route.name && (
      route.name.startsWith('login') ||
      route.name.startsWith('confirm-id') ||
      route.name.startsWith('registration')
    )
  );
}
function isRouteSecure(route) {
  return (
    route.name && (
      route.name.startsWith('dashboard')
    )
  );
}


export default async function ({ store, route, req, redirect, app }) {
  if (!process.server && !req) {
    return;
  }

  if(route.fullPath === '/') {
    return redirect(app.localePath({ name: 'index' }));
  }
  if(isAccessRoute(route) && store.getters.isLoggedIn) {
    return redirect(app.localePath({ name: 'dashboard' }));
  }
  if(isRouteSecure(route) && !store.getters.isLoggedIn) {
    return redirect(app.localePath({ name: 'login' }));
  }

}