import Vuex from 'vuex';
import CommonStore from './common/common.store';
import LoginStore from './login/login.store';
import RegistrationStore from './registration/registration.store';
import { all as merge } from 'deepmerge';

const createStore = () => {

  return new Vuex.Store(merge([
    CommonStore,
    LoginStore,
    RegistrationStore
  ]));
};

export default createStore;