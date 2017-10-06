import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartAddItemRequest: ['product', 'accessToken'],
  cartAddItemSuccess: ['items'],
  cartAddItemFail: null,
  cartGetCurrencyRequest: [],
  cartGetCurrencySuccess: ['rates'],
  cartGetCurrencyFail: ['message'],
  cartGetItemsRequest: ['accessToken'],
  cartGetItemsSuccess: ['items'],
  cartGetItemsFail: ['message'],
  cartRemoveItemRequest: ['accessToken', 'product'],
  cartRemoveItemSuccess: ['items'],
  cartRemoveItemFail: null,
  cartPaymentRequest: ['accessToken', 'paymentId', 'cartId'],
  cartPaymentSuccess: ['histories'],
  cartPaymentFail: ['message'],
  cartGetTransactionRequest: ['accessToken'],
  cartGetTransactionSuccess: ['histories'],
  cartGetTransactionFail: ['message'],
  cartReset: []
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  product: null,
  items: [],
  message: '',
  showMessage: false,
  fetching: false,
  rates: [],
  histories: [],
  accessToken: null,
  paymentId: null,
  cartId: null
})

/* ------------- Reducers ------------- */

// ADD ITEM: request the data from an api
export const addItemRequest = (state, { product, accessToken }) => state.merge({ fetching: false, accessToken, productId: product.id })

// ADD ITEM: successful api lookup
export const addItemSuccess = (state, {items}) => state.merge({ fetching: false, items: items })

// ADD ITEM: failure api lookup
export const addItemFail = (state, { message }) => state.merge({ fetching: false, message })

export const getCurrencyFail = (state, { message }) =>
state.merge({ error: true, message: message, showMessage: false })

export const getCurrencySuccess = (state, { rates }) => state.merge({ fetching: false, rates: rates, showMessage: false })

export const toHistory = (state, { historyItems }) =>
  state.merge({ historyItems: historyItems })

export const itemRemoved = (state, { items }) => {
  return state.merge({ adding: false, error: false, message: '', productId: null, items: items })
}
// REMOVE ITEM: request the data from an api
export const removeItemRequest = (state, { accessToken, product }) =>
state.merge({ fetching: true, accessToken, product })

// REMOVE ITEM: successful api lookup
export const removeItemSuccess = (state, {items}) => state.merge({ fetching: false, items: items })

// REMOVE ITEM: failure api lookup
export const removeItemFail = (state, { message }) => state.merge({ fetching: false, message })

// RESET to initial state
export const reset = () => INITIAL_STATE

// GET:  request the data from an api
export const getItemsRequest = (state, { accessToken }) => {
  return state.merge({ accessToken: accessToken, fetching: true })
}

// GET:  successful api lookup
export const getItemsSuccess = (state, { items }) => state.merge({ fetching: false, showMessage: false, items: items })

// GET:  failure api lookup
export const getItemsFail = (state, { message }) => state.merge({ fetching: false, message })

// PAYMENT: send payment data to an api
export const paymentRequest = (state, { accessToken, paymentId, cartId }) => {
  return state.merge({ accessToken: accessToken, paymentId: paymentId, cartId: cartId, showMessage: false, fetching: true })
}

// PAYMENT: successful api lookup then reset items
export const paymentSuccess = (state) => state.merge({ fetching: false, items: [], message: 'Payment completed. Go to Transaction Histories for downloading.', showMessage: true })

// PAYMENT: failure api lookup
export const paymentFail = (state, { message }) => state.merge({ fetching: false, message })

// TRANSACTION HISTORIES: get transaction data to an api
export const getTransactionRequest = (state, { accessToken }) => state.merge({ accessToken: accessToken, fetching: true, showMessage: false })

// PAYMENT: successful api lookup
export const getTransactionSuccess = (state, { histories }) => state.merge({ fetching: false, histories: histories })
// PAYMENT: failure api lookup
export const getTransactionFail = (state, { message }) => state.merge({ fetching: false, message, showMessage: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_ADD_ITEM_REQUEST]: addItemRequest,
  [Types.CART_REMOVE_ITEM_REQUEST]: removeItemRequest,
  [Types.CART_RESET]: reset,
  [Types.CART_GET_ITEMS_REQUEST]: getItemsRequest,
  [Types.CART_PAYMENT_REQUEST]: paymentRequest,
  [Types.CART_TRANSACTION_REQUEST]: getTransactionRequest,
  [Types.CART_ADD_ITEM_SUCCESS]: addItemSuccess,
  [Types.CART_ADD_ITEM_FAIL]: addItemFail,
  [Types.CART_REMOVE_ITEM_SUCCESS]: removeItemSuccess,
  [Types.CART_REMOVE_ITEM_FAIL]: removeItemFail,
  [Types.CART_GET_CURRENCY_SUCCESS]: getCurrencySuccess,
  [Types.CART_GET_ITEMS_SUCCESS]: getItemsSuccess,
  [Types.CART_GET_ITEMS_FAIL]: getItemsFail,
  [Types.CART_PAYMENT_SUCCESS]: paymentSuccess,
  [Types.CART_PAYMENT_FAIL]: paymentFail,
  [Types.CART_GET_TRANSACTION_SUCCESS]: getTransactionSuccess,
  [Types.CART_GET_TRANSACTION_FAILS]: getTransactionFail
})
