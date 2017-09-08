import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartAddItem: ['product'],
  cartItemAdded: ['items'],
  cartItemRemoved: ['items'],
  cartAddItemFailure: ['error', 'message'],
  cartReset: ['items']
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  product: null,
  items: [],
  adding: false,
  error: false,
  message: ''
})

/* ------------- Reducers ------------- */

export const addItem = (state, { product }) =>
  state.merge({ adding: true, product: product })

export const itemAdded = (state, { items }) => {
  return state.merge({ adding: false, error: false, message: '', productId: null, items: items })
}

export const addItemFailure = (state, { message }) =>
   state.merge({ adding: false, error: true, message: message, productId: null })

export const itemRemoved = (state, { items }) => {
  return state.merge({ adding: false, error: false, message: '', productId: null, items: items })
}

export const reset = (state, { items }) => {
  return state.merge({ items: items })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_ADD_ITEM]: addItem,
  [Types.CART_ITEM_ADDED]: itemAdded,
  [Types.CART_ADD_ITEM_FAILURE]: itemAdded,
  [Types.CART_ITEM_REMOVED]: itemRemoved,
  [Types.CART_RESET]: reset
})
