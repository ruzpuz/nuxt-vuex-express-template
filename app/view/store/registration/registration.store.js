import { post } from 'axios';

export default {
  actions: {
    /* eslint-disable-next-line no-unused-vars */
    DO_REGISTER({ commit }, user) {
      return post('/api/registration', user);
    },
    /* eslint-disable-next-line no-unused-vars */
    DO_CONFIRM_REGISTRATION({ commit }, secret) {
      return post('/api/confirm', secret);
    }
  }
};