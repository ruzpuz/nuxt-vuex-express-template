<style scoped>

</style>
<script>
  const emailRegex = new RegExp('^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$');

  export default {
    name: 'Registration',
    layout: 'access',
    data() {
      const roles = this.$store.getters.getRoles.filter(item => item.name !== 'administrator');

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
        this.$router.push({ name: 'login' });
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
          await this.$store.dispatch('DO_REGISTER', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            roleId: this.selectedRole
          });

          this.loading = false;
          this.$router.push({ name: 'login' });

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
      <div>
        <h3 class="headline mb-0">
          Registration
        </h3>
      </div>
    </v-card-title>
    <v-card-text>
      <v-form @keyup.enter.native="register">
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          label="First name"
          required />
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          label="Last name"
          required />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required />
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          required />
        <v-text-field
          v-model="repeatPassword"
          type="password"
          :rules="repeatPasswordRules"
          label="Repeat Password"
          required />
        <v-select
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
        login
      </v-btn>
      <v-btn
        :disabled="preventSubmission"
        color="info"
        @click="register">
        register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>