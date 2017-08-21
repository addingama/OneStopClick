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
import UserActions from '../Redux/UserRedux'
import ConvertUserProfile from '../Transforms/ConvertUserProfile'

export function * getUserProfile (api, { accessToken }) {
  // make the call to the api
  const response = yield call(api.getUserProfile, accessToken)
  const { error, message } = response.data

  // success?
  if (response.ok) {
    if (!error) {
      const { name, email } = response.data.data.user
      const user = ConvertUserProfile(name, email)
      yield put(UserActions.userProfileSuccess(user))
    } else {
      Alert.alert('Error', message)
    }
  } else if (response.status !== 200) {
    if (error !== '' || error != null) {
      Alert.alert('Error', error)
    }
    yield put(UserActions.userProfileFailure())
  }
}

export function * updateUserProfile (api, action) {
  console.tron.display({name: 'ACTION', value: action})
  const {accessToken, name, email, oldPassword, newPassword} = action
  const response = yield call(api.updateUserProfile, accessToken, name, email, oldPassword, newPassword)
  const { error, message } = response.data

  // success?
  if (response.ok) {
    if (!error) {
      const user = ConvertUserProfile(name, email)
      yield put(UserActions.userProfileUpdateSuccess(user))
      Alert.alert('Success', message)
    } else {
      yield put(UserActions.userProfileUpdateFailure())
      Alert.alert('Error', message)
    }
  } else if (response.status !== 200) {
    if (error !== '' || error != null) {
      Alert.alert('Error', error)
    }
    yield put(UserActions.userProfileUpdateFailure())
  }
}
