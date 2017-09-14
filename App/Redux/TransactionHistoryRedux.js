import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  transactionHistoryAddItems: ['products']
})

export const TransactionHistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  products: []
})

/* ------------- Reducers ------------- */

export const addItems = (state, { products }) =>
  state.merge({ product: products })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSACTION_HISTORY_ADD_ITEMS]: addItems
})
