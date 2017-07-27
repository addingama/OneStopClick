import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgotPasswordRequest: ['email'],
  forgotPasswordSuccess: ['error', 'message'],
  forgotPasswordFailure: ['error', 'message']
})

export const ForgotPasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  processing: false,
  error: false,
  message: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { email }) =>
  state.merge({ processing: true, email })

// successful api lookup
export const success = (state, action) => {
  const { error, message } = action
  return state.merge({ processing: false, error, message })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { error, message } = action
  state.merge({ processing: false, error, message })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGOT_PASSWORD_REQUEST]: request,
  [Types.FORGOT_PASSWORD_SUCCESS]: success,
  [Types.FORGOT_PASSWORD_FAILURE]: failure
})
