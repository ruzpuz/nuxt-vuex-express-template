<style scoped>

</style>
<script>
  const emailRegex = new RegExp('^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$');
  import LanguagePicker from '~/components/language-picker';

  export default {
    name: 'Registration',
    layout: 'access',
    nuxtI18n: {
      paths: {
        en: '/registration',
        rs: '/registracija'
      }
    },
    components: { LanguagePicker },
    head() {
      return { title: this.$t('registration.TITLE') };
    },
    data() {
      const roles = this.$store.getters['common/getRoles'].filter(item => item.name !== 'administrator');

      return {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        repeatPassword: '',
        firstNameRules: [
          v => !!v || 'First name is required',
          v => v.length < 128 || 'First name is too large'
        ],
        lastNameRules: [
          v => !!v || 'Last name is required',
          v => v.length < 128 || 'Last name is too large'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => emailRegex.test(v) || 'E-mail must be valid'
        ],
        repeatPasswordRules: [
          () => this.password === this.repeatPassword || 'Passwords do not match'
        ],
        roles: roles,
        selectedRole: roles[0].id,
        message: '',
        loading: false
      };
    },
    computed: {
      USER() {
        return {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          roleId: this.selectedRole
        };
      },
      preventSubmission() {
        return !(
          this.firstName &&
          this.firstName.length < 128 &&
          this.lastName &&
          this.lastName.length < 128 &&
          this.email &&
          emailRegex.test(this.email) &&
          this.password &&
          this.password === this.repeatPassword
        );
      }
    },
    methods: {
      navigateToLogin() {
        this.$router.push(this.localePath({ name: 'login' }));
      },
      reset() {
        this.loading = false;
        this.message = '';
      },
      async register() {
        if(this.preventSubmission) {
          return;
        }
        this.loading = true;

        try {
          await this.$store.dispatch('registration/DO_REGISTER', this.USER);

          this.loading = false;
          this.$router.push(this.localePath({ name: 'login' }));

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
        {{ $t('registration.HEAD') }}
      </h3>
      <v-spacer />
      <language-picker />
    </v-card-title>
    <v-card-text>
      <v-form @keyup.enter.native="register">
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          :label="$t('registration.FIRST_NAME_LABEL')"
          required />
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          :label="$t('registration.LAST_NAME_LABEL')"
          required />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="$t('registration.EMAIL_LABEL')"
          required />
        <v-text-field
          v-model="password"
          type="password"
          :label="$t('registration.PASSWORD_LABEL')"
          required />
        <v-text-field
          v-model="repeatPassword"
          type="password"
          :rules="repeatPasswordRules"
          :label="$t('registration.REPEAT_PASSWORD_LABEL')"
          required />
        <v-select
          v-show="roles.length > 1"
          v-model="selectedRole"
          :items="roles"
          item-text="name"
          item-value="id"
          label="Role" />
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
        {{ $t('registration.LOGIN_BUTTON') }}
      </v-btn>
      <v-btn
        :disabled="preventSubmission"
        color="info"
        @click="register">
        {{ $t('registration.REGISTRATION_BUTTON') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>