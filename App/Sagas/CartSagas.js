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

  const { message, details } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)
      yield put(CartActions.cartGetItemsFail(true, message))
    }
  } else {
    var resJSON = JSON.stringify(response.data)
    if (resJSON !== '{}') {
      yield put(CartActions.cartGetItemsSuccess(details))
    }
    yield put(CartActions.cartGetTransactionRequest(accessToken))
  }
}

export function * addItem (api, {product, accessToken}) {
  // make the call to the api
  const response = yield call(api.addToCart, accessToken, product.id, 1)
  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', product.product_name)
      yield put(CartActions.cartAddItemFail(true, message))
    }
  } else {
    if (message !== null) {
      Alert.alert('Success', product.product_name + ' has been added to cart.')
      yield put(CartActions.cartAddItemSuccess(response.data.details))
    }
  }
}

export function * removeItem (api, {accessToken, product}) {
  // make the call to the api
  var productId = product.product_id
  const response = yield call(api.removeFromCart, accessToken, productId)

  const { message, details } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)

      yield put(CartActions.cartRemoveItemFail(true, message))
    }
  } else {
    var resJSON = JSON.stringify(response.data)
    if (resJSON !== '{}') {
      yield put(CartActions.cartRemoveItemSuccess(details))
    } else {
      yield put(CartActions.cartRemoveItemSuccess([]))
    }
  }
}

export function * payment (api, {accessToken, paymentId, cartId}) {
  // make the call to the api
  // code 01 for paypal
  // code 02 for wallet

  var paymentCode = '01'
  const response = yield call(api.sendPaymentId, accessToken, paymentId, paymentCode, cartId)

  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)

      yield put(CartActions.cartPaymentFail(message))
    }
  } else {
    if (response.data !== null) {
      yield put(CartActions.cartPaymentSuccess())
      yield put(CartActions.cartGetTransactionRequest(accessToken))
    }
  }
}

export function * getTransactionHistory (api, {accessToken}) {
  // make the call to the api
  const response = yield call(api.transactionHistory, accessToken)

  const { message } = response.data

  if (response.status !== 200) {
    if (message !== '' || message != null) {
      Alert.alert('Error', message)

      yield put(CartActions.cartGetTransactionFail(message))
    }
  } else {
    if (response.data !== null) {
      var resJSON = JSON.stringify(response.data)
      if (resJSON !== '{}') {
        yield put(CartActions.cartGetTransactionSuccess(response.data))
      }
    }
  }
}
