<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">
        {{ $t('restorePassword.HEAD') }}
      </h3>
      <v-spacer />
      <language-picker />
    </v-card-title>
    <v-card-text>
      <v-form @keyup.enter.native="restorePassword">
        <v-text-field
          v-model="password"
          type="password"
          :label="$t('restorePassword.PASSWORD_LABEL')"
          required />
        <v-text-field
          v-model="repeatPassword"
          type="password"
          :rules="repeatPasswordRules"
          :label="$t('restorePassword.REPEAT_PASSWORD_LABEL')"
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
        {{ $t('restorePassword.LOGIN_BUTTON') }}
      </v-btn>
      <v-btn
        color="info"
        :disabled="preventSubmission"
        @click="restorePassword">
        {{ $t('restorePassword.RESTORE_PASSWORD_BUTTON') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import LanguagePicker from '../../../components/language-picker.vue';

  export default {
    name: 'RestorePassword',
    meta: { secure: false },
    layout: 'access',
    nuxtI18n: {
      paths: {
        us: '/restore-password/:restorationToken',
        rs: '/vracanje-lozinke/:restorationToken'
      }
    },
    components: { LanguagePicker },
    head() {
      return { title: this.$t('restorePassword.TITLE') };
    },
    data() {
      const { repeatPasswordRules } = this.$formValidators();

      return {
        password: '',
        repeatPassword: '',
        repeatPasswordRules,
        loading: false,
        message: ''
      };
    },
    computed: {
      preventSubmission() {
        return !(
          this.password &&
          this.password === this.repeatPassword
        );
      }
    },
    methods: {
      navigateToLogin() {
        this.$router.push(this.localePath({ name: 'login' }));
      },
      restorePassword() {

      }
    }
  };
</script>

<style scoped>

</style>