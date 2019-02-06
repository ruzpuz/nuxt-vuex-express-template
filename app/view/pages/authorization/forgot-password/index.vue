<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">
        {{ $t('forgotPassword.HEAD') }}
      </h3>
      <v-spacer />
      <language-picker />
    </v-card-title>
    <v-card-text>
      <v-form @keyup.enter.native="forgotPassword">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="$t('login.EMAIL_LABEL')"
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
        @click="navigateToLogin">
        {{ $t('forgotPassword.LOGIN_BUTTON') }}
      </v-btn>
      <v-btn
        color="info"
        :disabled="preventSubmission"
        @click="forgotPassword">
        {{ $t('forgotPassword.SEND_EMAIL_BUTTON') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import LanguagePicker from '../../../components/language-picker.vue';
  export default {
    name: 'ForgotPassword',
    meta: { secure: false },
    layout: 'access',
    nuxtI18n: {
      paths: {
        rs: '/zaboravljena-lozinka',
        us: '/forgot-password'
      }
    },
    components: { LanguagePicker },
    head() {
      return { title: this.$t('forgotPassword.TITLE') };
    },
    data() {
      const { emailRules } = this.$formValidators();

      return {
        email: '',
        message: '',
        loading: false,
        emailRules
      };
    },
    computed: {
      preventSubmission() {
        const { isEmailValid } = this.$formValidators();
        return !(
          this.email &&
          isEmailValid(this.email)
        );
      }
    },
    methods: {
      forgotPassword() {

      },
      navigateToLogin() {
        this.$router.push(this.localePath({ name: 'login' }));
      }
    }
  };
</script>

<style scoped>

</style>