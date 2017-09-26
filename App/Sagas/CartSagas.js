import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import CartActions from '../Redux/CartRedux'

export function * getCurrency (exapi) {
  const response = yield call(exapi.getCurrency)
  const { message, rates } = response.data
  if (response.status !== 200) {
    if (message !== '' || message != null) {
      yield put(CartActions.cartGetCurrencyFailure(true, message))
    }
  } else {
    yield put(CartActions.cartGetCurrencySuccess(rates))
  }
}

export function * getItems (api, {accessToken}) {
  // make the call to the api
  const response = yield call(api.getCart, accessToken)

  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(CartActions.cartGetCartItemsFailure(true, message))
    }
  } else {
    if (response.data !== null) {
      yield put(CartActions.cartGetCartItemsSuccess(response.data))
    }
  }
}

export function * addItem (api, {product, accessToken}) {
  // make the call to the api
  console.tron.log(product[0].product_name)
  const response = yield call(api.addToCart, accessToken, product[0].id, 1)
  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      yield put(CartActions.cartAddItemFail(true, message))
    }
  } else {
    if (response.data !== null) {
      Alert.alert('Success', product[0].product_name + ' has been added to cart.')
      yield put(CartActions.cartAddItemSuccess(response.data.details))
    }
  }
}

export function * removeCartItems (api, {accessToken, productId}) {
  // make the call to the api
  const response = yield call(api.removeCartItems, accessToken, productId)

  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)

      // yield put(CartActions.cartGetCartItemsFailure(true, message))
    }
  } else {
    if (response.data !== null) {
      // yield put(CartActions.cartGetCartItemsSuccess(response.data))
    }
  }
}

export function * sendPaymentId (api, {accessToken, paymentId}) {
  // make the call to the api
  const response = yield call(api.paymentId, accessToken, paymentId)

  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)

      // yield put(CartActions.cartGetCartItemsFailure(true, message))
    }
  } else {
    if (response.data !== null) {
      console.tron.log('payment')
      // yield put(CartActions.cartGetCartItemsSuccess(response.data))
    }
  }
}
