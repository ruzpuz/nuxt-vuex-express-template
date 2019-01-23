import { post } from 'axios';

export default {
  actions: {
    /* eslint-disable-next-line no-unused-vars */
    DO_REGISTER({ commit }, user) {
      return post('/api/registration', user);
    }
  }

};