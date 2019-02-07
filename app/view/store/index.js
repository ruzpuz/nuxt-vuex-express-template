import Vuex from 'vuex';
import CommonStore from './common/common.store';
import LoginStore from './authorization/login/login.store';
import RegistrationStore from './authorization/registration/registration.store';
import ForgotPasswordStore from './authorization/forgot-password/forgot-password.store';
import LanguageStore from './languages/languages.store';

const createStore = () => new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    common: CommonStore,
    login: LoginStore,
    registration: RegistrationStore,
    forgotPassword: ForgotPasswordStore,
    languages: LanguageStore
  },
  actions: {
    nuxtServerInit({ dispatch }, { req, app }) {
      dispatch('languages/DO_LOAD_LANGUAGES', { i18n: app.i18n, cookies: req.cookies });
    }
  }
});


export default createStore;