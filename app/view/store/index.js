import Vuex from 'vuex';
import CommonStore from './common/common.store';
import LoginStore from './login/login.store';
import RegistrationStore from './registration/registration.store';
import LanguageStore from './languages/languages.store';

const createStore = () => new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    common: CommonStore,
    login: LoginStore,
    registration: RegistrationStore,
    languages: LanguageStore
  },
  actions: {
    nuxtServerInit({ dispatch }, { req, app }) {
      dispatch('languages/DO_LOAD_LANGUAGES', { i18n: app.i18n, cookies: req.cookies });
    }
  }
});


export default createStore;