/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/
import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import ForgotPasswordActions from '../Redux/ForgotPasswordRedux'

export function * forgotPassword (api, {email}) {
  // make the call to the api
  const response = yield call(api.forgotPassword, email)
  // success?
  if (response.status === 200) {
    const { error, message } = response.data
    if (error) {
      Alert.alert('Error', message)
      yield put(ForgotPasswordActions.forgotPasswordSuccess(error, message))
    } else {
      Alert.alert('Success', message)
      yield put(ForgotPasswordActions.forgotPasswordSuccess(error, message))
    }
  } else if (response.status === 500) {
    yield put(ForgotPasswordActions.forgotPasswordFailure(true, 'Server problem'))
  }
}
