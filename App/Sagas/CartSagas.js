import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import CartActions from '../Redux/CartRedux'

export function * getCurrency (exapi) {
  console.tron.log('CartSagas')
  // make the call to the api
  console.tron.log(exapi.baseURL)
  const response = yield call(exapi.getCurrency)
  const { message, rates } = response.data
  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(CartActions.cartGetCurrencyFailure(true, message))
    }
  } else {
    console.tron.log('CartSagas - success')
    yield put(CartActions.cartGetCurrencySuccess(rates))
  }
}
