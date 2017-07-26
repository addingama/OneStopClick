export const registration = {
  name: {
    name: 'name',
    secureText: false,
    value: '',
    valid: true,
    edited: false,
    validation: ['required'],
    returnKeyType: 'next',
    keyboardType: 'default'
  },
  email: {
    name: 'email',
    secureText: false,
    value: '',
    valid: true,
    edited: false,
    validation: ['required', 'email'],
    returnKeyType: 'next',
    keyboardType: 'email-address'
  },
  password: {
    name: 'password',
    secureText: true,
    value: '',
    valid: true,
    edited: false,
    validation: ['required', {minLength: 6}],
    returnKeyType: 'next',
    keyboardType: 'default'
  },
  password_confirmation: {
    name: 'password_confirmation',
    secureText: true,
    value: '',
    valid: true,
    edited: false,
    validation: ['required', {minLength: 6}],
    returnKeyType: 'go',
    keyboardType: 'default'
  }
}
