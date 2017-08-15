export const profile = {
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
  oldPassword: {
    name: 'oldPassword',
    secureText: true,
    value: '',
    valid: true,
    edited: false,
    validation: [],
    returnKeyType: 'next',
    keyboardType: 'default'
  },
  newPassword: {
    name: 'newPassword',
    secureText: true,
    value: '',
    valid: true,
    edited: false,
    validation: [],
    returnKeyType: 'go',
    keyboardType: 'default'
  }
}
