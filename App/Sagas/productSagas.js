import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import productActions from '../Redux/ProductRedux'

export function * getProducts (api) {
  // make the call to the api
  const response = yield call(api.getProducts)
  console.tron.log('data', response)
  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(productActions.getProductsFailure(true, message))
    }
  } else {
    yield put(productActions.getProductsSuccess(response.data))
  }
}
