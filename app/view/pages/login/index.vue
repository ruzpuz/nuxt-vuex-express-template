<style scoped>

</style>
<script>
  import Cookies from 'js-cookie';

  const emailRegex = new RegExp('^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$');
  export default {
    name: 'login',
    layout: 'access',

    methods: {
      navigateToRegistration() {
        this.$router.push({ name: 'registration' });
      },
      reset() {
        this.loading = false;
        this.message = '';
      },
      async fbLoginCallback({ authResponse }) {
        try {
          const data = await this.$store.dispatch('DO_FACEBOOK_LOGIN', {
            post: this.$axios.post,
            secret: {
              accessToken: authResponse.accessToken,
            }
          });

          Cookies.set('ks-security', data[ 'ks-security' ], { path: '/' });
          this.loading = false;

          this.$router.push({ name: 'dashboard' });
        } catch(error) {
          this.loading = false;
          this.message = error.response.data;
          setTimeout(this.reset, 1500);
        }
      },
      fbLoginStatusCallback(authResponse) {
        if(!authResponse) {
          FB.login(this.fbLoginCallback, { scope: 'public_profile,email' });
        } else {
          this.fbLoginCallback(authResponse);
        }
      },
      facebookLogin() {
        FB.getLoginStatus(this.fbLoginStatusCallback)
      },
      async login() {
        if(this.preventSubmission) {
          return;
        }
        this.loading = true;
        try {
          const data = await this.$store.dispatch('DO_LOGIN', {
            post: this.$axios.post,
            secret: {
              email: this.email,
              password: this.password
            }
          });

          Cookies.set('ks-security', data[ 'ks-secutiry' ], { path: '/' });
          this.loading = false;

          this.$router.push({ name: 'dashboard' });
        } catch(error) {
          this.loading = false;
          this.message = error.response.data;
          setTimeout(this.reset, 1500);
        }

      }
    },
    data: function () {
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
  }
</script>
<template>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Login</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-form @keyup.enter.native="login">
                    <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required>
                    </v-text-field>
                    <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            required>
                    </v-text-field>
                    <div v-if="loading" class="text-xs-center">
                        <v-progress-circular :indeterminate="true"></v-progress-circular>
                    </div>
                    <div v-if="message" class="text-xs-center font-weight-bold title red--text">
                        {{ message }}
                    </div>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" v-on:click="navigateToRegistration" flat>register</v-btn>
                <v-btn color="info" v-on:click="login" :disabled="preventSubmission">login</v-btn>
            </v-card-actions>
        </v-card>
</template>

