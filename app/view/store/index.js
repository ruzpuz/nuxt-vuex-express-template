import Vuex from 'vuex';
import CommonStore from './common/common.store';
import LoginStore from './login/login.store';
import merge from 'deepmerge';

const createStore = () => {
  return new Vuex.Store(merge(
    CommonStore,
    LoginStore
  ));
};

export default createStore;