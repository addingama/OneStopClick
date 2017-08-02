import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { RegistrationTypes } from '../Redux/RegistrationRedux'
import { ForgotPasswordTypes } from '../Redux/ForgotPasswordRedux'

/* ------------- Sagas ------------- */

import { login, socialLogin } from './LoginSagas'
import { registration } from './RegistrationSagas'
import { forgotPassword } from './ForgotPasswordSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(RegistrationTypes.REGISTRATION_REQUEST, registration, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(LoginTypes.SOCIAL_LOGIN_REQUEST, socialLogin, api)
  ]
}
