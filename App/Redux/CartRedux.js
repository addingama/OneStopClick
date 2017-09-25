import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartAddItemRequest: ['product', 'accessToken'],
  cartAddItemSuccess: ['items'],
  cartAddItemFail: null,
  cartGetCurrencySuccess: ['rates'],
  cartGetCurrencyFail: ['message'],
  cartItemRemoved: ['items'],
  cartReset: ['items'],
  cartGetCurrencyRequest: [],
  cartGetItems: ['accessToken'],
  cartRemoveItem: ['accessToken', 'product'],
  cartSendPaymentId: ['paymentId']
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */
/* action type:
  adding: 1
  removing: 2
  getAll: 3
  currency: 4
   */
export const INITIAL_STATE = Immutable({
  product: null,
  items: [],
  actionType: 1,
  message: '',
  rates: [],
  histories: [],
  accessToken: null,
  paymentId: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const addItemRequest = (state, { accessToken, product }) =>
state.merge({ fetching: true, accessToken, product })

// successful api lookup
export const addItemSuccess = (state, {items}) => {
  console.tron.log('Add item success redux ' + items.length)
  // return state.merge({ fetching: false, error: false, items: items })
}

export const addItemFail = (state, { message }) => {
  state.merge({ fetching: false, message })
  console.tron.log('Add item fail redux ')
  // return state.merge({ fetching: false, error: false, items: items })
}

export const getCurrencyFail = (state, { message }) =>
state.merge({ error: true, message: message })

export const getCurrencySuccess = (state, { rates }) => {
  return state.merge({ rates: rates })
}

// Something went wrong somewhere.
export const failure = (state, { message }) =>
state.merge({ fetching: false, error: true, message })

export const toHistory = (state, { historyItems }) =>
  state.merge({ historyItems: historyItems })

export const itemRemoved = (state, { items }) => {
  return state.merge({ adding: false, error: false, message: '', productId: null, items: items })
}

export const reset = (state, { items }) => {
  return state.merge({ histories: items, items: [] })
}

// get cart items
export const getItems = (state, { accessToken }) => {
  return state.merge({ accessToken: accessToken })
}

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
  [Types.CART_ITEM_REMOVED]: itemRemoved,
  [Types.CART_RESET]: reset,
  [Types.CART_REMOVE_ITEM_API]: removeItemAPI,
  [Types.CART_GET_ITEMS]: getItems,
  [Types.CART_ADD_ITEM_SUCCESS]: addItemSuccess,
  [Types.CART_ADD_ITEM_FAIL]: addItemFail
})
