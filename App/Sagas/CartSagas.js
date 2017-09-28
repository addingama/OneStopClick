import { Alert, Platform } from 'react-native'
import { call, put } from 'redux-saga/effects'
import CartActions from '../Redux/CartRedux'
import Toast from 'react-native-toast-native'
import { Colors } from '../Themes/'
import Reactotron from 'reactotron-react-native'

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
    Reactotron.display({
      name: 'GetItems response',
      value: response,
      preview: JSON.stringify(response).substr(0, 500)
    })
    var resJSON = JSON.stringify(response.data)
    if (resJSON !== '{}') {
      console.tron.log('has data ' + resJSON)
      yield put(CartActions.cartGetItemsSuccess(details))
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
      Alert.alert('Error', product[0].product_name)
      yield put(CartActions.cartAddItemFail(true, message))
    }
  } else {
    if (message !== null) {
      Alert.alert('Success', product[0].product_name + ' has been added to cart.')
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
    Reactotron.display({
      name: 'GetItems response',
      value: response,
      preview: JSON.stringify(response).substr(0, 500)
    })

    var resJSON = JSON.stringify(response.data)
    if (resJSON !== '{}') {
      console.tron.log('has data ' + resJSON)

      yield put(CartActions.cartRemoveItemSuccess(details))
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
      const style = {
        backgroundColor: Colors.errorToast,
        width: 300,
        height: Platform.OS === ('ios') ? 50 : 100,
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 2,
        lines: 4,
        borderRadius: 15,
        fontWeight: 'bold',
        yOffset: 40
      }
      Toast.show('Payment completed. Download link available in Transaction History.', Toast.SHORT, Toast.TOP, style)
      yield put(CartActions.cartPaymentSuccess(response.data.details))
    }
  }
}
