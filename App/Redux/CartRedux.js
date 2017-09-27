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
  cartGetItemsFail: [],
  cartRemoveItemRequest: ['accessToken', 'product'],
  cartRemoveItemSuccess: ['items'],
  cartRemoveItemFail: null,
  cartSendPaymentId: ['paymentId'],
  cartReset: []
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  product: null,
  items: [],
  message: '',
  rates: [],
  histories: [],
  accessToken: null,
  paymentId: null
})

/* ------------- Reducers ------------- */

// ADD ITEM: request the data from an api
export const addItemRequest = (state, { product, accessToken }) => {
  console.tron.log('add product id ' + product.id)
  return state.merge({ fetching: true, accessToken, productId: product.id })
}

// ADD ITEM: successful api lookup
export const addItemSuccess = (state, {items}) => state.merge({ fetching: true, items: items })

// ADD ITEM: failure api lookup
export const addItemFail = (state, { message }) => state.merge({ fetching: false, message })

export const getCurrencyFail = (state, { message }) =>
state.merge({ error: true, message: message })

export const getCurrencySuccess = (state, { rates }) => state.merge({ fetching: true, rates: rates })

export const toHistory = (state, { historyItems }) =>
  state.merge({ historyItems: historyItems })

export const itemRemoved = (state, { items }) => {
  return state.merge({ adding: false, error: false, message: '', productId: null, items: items })
}
// REMOVE ITEM: request the data from an api
export const removeItemRequest = (state, { accessToken, product }) =>
state.merge({ fetching: true, accessToken, product })

// REMOVE ITEM: successful api lookup
export const removeItemSuccess = (state, {items}) => state.merge({ fetching: true, items: items })

// REMOVE ITEM: failure api lookup
export const removeItemFail = (state, { message }) => state.merge({ fetching: false, message })

// RESET to initial state
export const reset = () => INITIAL_STATE

// GET:  request the data from an api
export const getItemsRequest = (state, { accessToken }) => {
  return state.merge({ accessToken: accessToken })
}

// GET:  request the data from an api
export const getItemsSuccess = (state, { items }) => state.merge({ fetching: true, items: items })

// GET:  request the data from an api
export const getItemsFail = (state, { message }) => state.merge({ fetching: false, message })

// get cart item
export const removeItemAPI = (state, { accessToken, product }) => {
  return state.merge({ accessToken: accessToken, product: product })
}

// send payment item
export const sendPaymentId = (state, { accessToken, paymentId }) => {
  return state.merge({ accessToken: accessToken, paymentId: paymentId })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_ADD_ITEM_REQUEST]: addItemRequest,
  [Types.CART_REMOVE_ITEM_REQUEST]: removeItemRequest,
  [Types.CART_RESET]: reset,
  [Types.CART_GET_ITEMS_REQUEST]: getItemsRequest,
  [Types.CART_ADD_ITEM_SUCCESS]: addItemSuccess,
  [Types.CART_ADD_ITEM_FAIL]: addItemFail,
  [Types.CART_REMOVE_ITEM_SUCCESS]: removeItemSuccess,
  [Types.CART_REMOVE_ITEM_FAIL]: removeItemFail,
  [Types.CART_GET_CURRENCY_SUCCESS]: getCurrencySuccess,
  [Types.CART_GET_ITEMS_SUCCESS]: getItemsSuccess,
  [Types.CART_GET_ITEMS_FAIL]: getItemsFail
})
