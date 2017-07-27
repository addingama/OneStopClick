import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import RegistrationActions from '../Redux/RegistrationRedux'

export function * registration (api, {name, email, password, password_confirmation}) {
  // make the call to the api
  const response = yield call(api.registration, name, email, password, password_confirmation)
  console.tron.log('data', response)
  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(RegistrationActions.registrationFailure(true, message))
    }
  } else {
    Alert.alert('Message', message)
    yield put(RegistrationActions.registrationSuccess(message))
  }
}
