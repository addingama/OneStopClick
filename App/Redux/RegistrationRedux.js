import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registrationRequest: ['name', 'email', 'password', 'password_confirmation'],
  registrationSuccess: ['message'],
  registrationFailure: ['message']
})

export const RegistrationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
  code: null,
  error: false,
  message: null,
  registering: false
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { name, email, password, password_confirmation }) =>
  state.merge({ registering: true, name, email, password, password_confirmation })

// successful api lookup
export const success = (state, { code, message }) => {
  return state.merge({ registering: false, error: false, message })
}

// Something went wrong somewhere.
export const failure = (state, { message }) =>
  state.merge({ registering: false, error: true, message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTRATION_REQUEST]: request,
  [Types.REGISTRATION_SUCCESS]: success,
  [Types.REGISTRATION_FAILURE]: failure
})
