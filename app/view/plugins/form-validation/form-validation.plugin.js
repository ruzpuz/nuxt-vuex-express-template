export default function(context, inject) {
  const emailRegex = new RegExp('^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$');

  function getValidators() {
    return {
      isEmailValid: (email) => emailRegex.test(email),
      firstNameRules: [
        v => !!v || this.$t('formValidation.NO_FIRST_NAME'),
        v => v.length < 128 || this.$t('formValidation.INVALID_FIRST_NAME_TOO_LONG')
      ],
      lastNameRules: [
        v => !!v || this.$t('formValidation.NO_LAST_NAME'),
        v => v.length < 128 || this.$t('formValidation.INVALID_LAST_NAME_TOO_LONG')
      ],
      emailRules: [
        v => !!v || this.$t('formValidation.NO_EMAIL'),
        v => emailRegex.test(v) || this.$t('formValidation.INVALID_EMAIL')
      ],
      repeatPasswordRules: [
        () => this.password === this.repeatPassword || this.$t('formValidation.PASSWORDS_DO_NOT_MATCH')
      ]
    };
  }

  inject('formValidators', getValidators);
  context.$formValidators = getValidators;
}