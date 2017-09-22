import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartAddItem: ['product', 'accessToken'],
  cartItemRemoved: ['items'],
  cartAddItemSuccess: ['items'],
  cartAddItemFailure: ['error', 'message'],
  cartReset: ['items'],
  cartGetCurrency: [],
  cartGetCurrencySuccess: ['rates'],
  cartGetCurrencyFailure: ['error', 'message'],
  cartGetItems: ['accessToken'],
  cartGetItemsSuccess: ['items'],
  cartGetItemsFailure: ['message'],
  cartRemoveItem: ['accessToken', 'product'],
  cartRemoveItemSuccess: ['product'],
  cartRemoveItemFailure: ['message'],
  cartSendPaymentId: ['paymentId']
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  product: null,
  items: [],
  adding: false,
  error: false,
  message: '',
  rates: [],
  histories: [],
  accessToken: null,
  paymentId: null
})

/* ------------- Reducers ------------- */

// add cart items
export const addItem = (state, { product, accessToken }) => {
  console.tron.log('product ' + product + ', accessToken ' + accessToken)
  state.merge({ adding: true, product: product, accessToken: accessToken })
}

// successful api lookup
export const addItemSuccess = (state, { items }) => {
  // state.merge({ fetching: false, error: false, items: items })
  // console.tron.log('items length ' + items.length)
  // return state.merge({ fetching: false, error: false, items: items })
}

// Something went wrong somewhere.
export const addItemFailure = (state, { message }) =>
state.merge({ fetching: false, error: true, message })

export const toHistory = (state, { historyItems }) =>
  state.merge({ historyItems: historyItems })

export const itemRemoved = (state, { items }) => {
  return state.merge({ adding: false, error: false, message: '', productId: null, items: items })
}

export const reset = (state, { items }) => {
  return state.merge({ histories: items, items: [] })
}

export const getCurrencyFailure = (state, { message }) =>
state.merge({ error: true, message: message })

export const getCurrencySuccess = (state, { rates }) => {
  return state.merge({ rates: rates })
}

// get cart items
export const getItems = (state, { accessToken }) => {
  return state.merge({ accessToken: accessToken })
}

// successful api lookup
export const getItemsSuccess = (state, { items }) => {
  return state.merge({ fetching: false, error: false, items })
}

// Something went wrong somewhere.
export const getItemsFailure = (state, { message }) =>
state.merge({ fetching: false, error: true, message })

// get cart item
export const removeItemAPI = (state, { accessToken, product }) => {
  return state.merge({ accessToken: accessToken, product: product })
}

// successful api lookup
export const removeItemSuccess = (state, { items }) => {
  return state.merge({ fetching: false, error: false, items })
}

// Something went wrong somewhere.
export const removeItemFailure = (state, { message }) =>
state.merge({ fetching: false, error: true, message })

// send payment item
export const sendPaymentId = (state, { accessToken, paymentId }) => {
  return state.merge({ accessToken: accessToken, paymentId: paymentId })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_ADD_ITEM_SUCCESS]: addItemSuccess,
  [Types.CART_ADD_ITEM_FAILURE]: addItemFailure,
  [Types.CART_ITEM_REMOVED]: itemRemoved,
  [Types.CART_RESET]: reset,
  [Types.CART_GET_ITEMS]: getItems,
  [Types.CART_GET_ITEMS_SUCCESS]: getItemsSuccess,
  [Types.CART_GET_ITEMS_FAILURE]: getItemsFailure,
  [Types.CART_REMOVE_ITEM_API]: removeItemAPI,
  [Types.CART_REMOVE_ITEM_API_SUCCESS]: removeItemSuccess,
  [Types.CART_REMOVE_ITEM_API_FAILURE]: removeItemFailure
})
