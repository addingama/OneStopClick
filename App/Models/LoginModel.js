export const login = {
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
    validation: ['required'],
    returnKeyType: 'go',
    keyboardType: 'default'
  }
}
