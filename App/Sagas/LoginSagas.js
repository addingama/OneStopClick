import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import StorageService from '../Services/StorageService'

export function * login (api, {username, password}) {
  // make the call to the api
  const response = yield call(api.login, username, password)
  const { message, access_token, refresh_token } = response.data
  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(LoginActions.loginFailure(true, message))
    }
  } else {
    StorageService.saveSession(access_token, refresh_token)
    yield put(LoginActions.loginSuccess(access_token, refresh_token))
  }
}

export function * socialLogin (api, {name, email}) {
  // make the call to the api
  const response = yield call(api.socialLogin, name, email)
  const { message, access_token, refresh_token } = response.data
  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(LoginActions.socialLoginFailure(true, message))
    }
  } else {
    StorageService.saveSession(access_token, refresh_token)
    yield put(LoginActions.socialLoginSuccess(access_token, refresh_token))
  }
}
