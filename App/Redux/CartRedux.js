import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartAddItem: ['product'],
  cartItemAdded: ['items'],
  cartItemRemoved: ['items'],
  cartAddItemFailure: ['error', 'message'],
  cartReset: ['items'],
  cartGetCurrency: [],
  cartGetCurrencySuccess: ['rates'],
  cartGetCurrencyFailure: ['error', 'message'],
  cartRequest: ['accessToken'],
  cartRequestSuccess: ['products'],
  cartRequestFailure: ['message']
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
  accessToken: null
})

/* ------------- Reducers ------------- */

export const addItem = (state, { product }) =>
  state.merge({ adding: true, product: product })

export const toHistory = (state, { historyItems }) =>
  state.merge({ historyItems: historyItems })

export const itemAdded = (state, { items }) => {
  return state.merge({ adding: false, error: false, message: '', productId: null, items: items })
}

export const addItemFailure = (state, { message }) =>
   state.merge({ adding: false, error: true, message: message, productId: null })

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

export const request = (state, { accessToken }) => {
  return state.merge({ accessToken: accessToken })
}

// successful api lookup
export const requestSuccess = (state, { items }) => {
  return state.merge({ fetching: false, error: false, items })
}

// Something went wrong somewhere.
export const requestFailure = (state, { message }) =>
state.merge({ fetching: false, error: true, message })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_ADD_ITEM]: addItem,
  [Types.CART_ITEM_ADDED]: itemAdded,
  [Types.CART_ADD_ITEM_FAILURE]: addItemFailure,
  [Types.CART_ITEM_REMOVED]: itemRemoved,
  [Types.CART_RESET]: reset,
  [Types.CART_REQUEST]: request,
  [Types.CART_REQUEST_SUCCESS]: requestSuccess,
  [Types.CART_REQUEST_FAILURE]: requestFailure
})
