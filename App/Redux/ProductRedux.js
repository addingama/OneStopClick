import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProductsRequest: [],
  getProductsSuccess: ['products'],
  getProductsFailure: ['message']
})

export const ProductTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  code: null,
  error: false,
  message: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, { products }) => {
  return state.merge({ fetching: false, error: false, products })
}

// Something went wrong somewhere.
export const failure = (state, { message }) =>
  state.merge({ fetching: false, error: true, message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCTS_REQUEST]: request,
  [Types.GET_PRODUCTS_SUCCESS]: success,
  [Types.GET_PRODUCTS_FAILURE]: failure
})
