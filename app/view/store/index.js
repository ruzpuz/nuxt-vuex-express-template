import Vuex from 'vuex';
import CommonStore from './common/common.store';

const createStore = () => {
  return new Vuex.Store({
    ...CommonStore
  });
};

export default createStore;