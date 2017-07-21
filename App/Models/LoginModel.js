var Login = {
    username: {
        name: 'username',
        secureText: false,
        value: '',
        valid: true,
        edited: false,
        validation: ['required', 'email']
    },
    password: {
        name: 'password',
        secureText: true,
        value: '',
        valid: true,
        edited: false,
        validation: ['required']
    }
}

export default Login