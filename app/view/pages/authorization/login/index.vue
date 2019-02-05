<style scoped>

</style>
<script>
  import LanguagePicker from '../../../components/language-picker';

  const emailRegex = new RegExp('^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$');

  export default {
    name: 'Login',
    layout: 'access',
    nuxtI18n: {
      paths: {
        us: '/login',
        rs: '/uloguj-se'
      }
    },
    components: { LanguagePicker },
    head() {
      return { title: this.$t('login.TITLE') };
    },
    data() {
      return {
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => emailRegex.test(v) || 'E-mail must be valid'
        ],
        message: '',
        loading: false
      };
    },
    computed: {
      preventSubmission() {
        return !(
          this.email &&
          emailRegex.test(this.email) &&
          this.password
        );
      }
    },
    methods: {
      navigateToRegistration() {
        this.$router.push(this.localePath({ name: 'registration' }));
      },
      reset() {
        this.loading = false;
        this.message = '';
      },
      async fbLoginCallback({ authResponse }) {
        try {
          await this.$store.dispatch('login/DO_FACEBOOK_LOGIN', {
            secret: {
              accessToken: authResponse.accessToken
            }
          });

          this.loading = false;

          this.$router.push(this.localePath({ name: 'dashboard' }));
        } catch(error) {
          this.loading = false;
          this.message = error.response.data;
          setTimeout(this.reset, 1500);
        }
      },
      facebookLogin() {
        FB.getLoginStatus((authResponse) => {
          if(!authResponse) {
            FB.login(this.fbLoginCallback, { scope: 'public_profile,email' });
          } else {
            this.fbLoginCallback(authResponse);
          }
        });
      },
      async login() {
        if(this.preventSubmission) {
          return;
        }
        this.loading = true;
        try {
          await this.$store.dispatch('login/DO_LOGIN', {
            secret: {
              email: this.email,
              password: this.password
            }
          });

          this.loading = false;

          this.$router.push(this.localePath({ name: 'dashboard' }));
        } catch(error) {
          this.loading = false;
          this.message = error.response.data;
          setTimeout(this.reset, 1500);
        }

      }
    }
  };
</script>
<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">
        {{ $t('login.HEAD') }}
      </h3>
      <v-spacer />
      <language-picker />
    </v-card-title>
    <v-card-text>
      <v-form @keyup.enter.native="login">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="$t('login.EMAIL_LABEL')"
          required />
        <v-text-field
          v-model="password"
          :label="$t('login.PASSWORD_LABEL')"
          type="password"
          required />
        <div
          v-if="loading"
          class="text-xs-center">
          <v-progress-circular :indeterminate="true" />
        </div>
        <div
          v-if="message"
          class="text-xs-center font-weight-bold title red--text">
          {{ message }}
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue"
        flat
        @click="navigateToRegistration">
        {{ $t('login.REGISTRATION_BUTTON') }}
      </v-btn>
      <v-btn
        color="info"
        :disabled="preventSubmission"
        @click="login">
        {{ $t('login.LOGIN_BUTTON') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

