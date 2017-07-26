import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export function * login (api, {username, password}) {
  // make the call to the api
  const response = yield call(api.login, username, password)
  console.tron.log('data', response)
  const { message, access_token, refresh_token } = response.data
  // const message = 'on progress'
  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(LoginActions.loginFailure(true, message))
    }
  } else {
    yield put(LoginActions.loginSuccess(access_token, refresh_token))
  }
}
