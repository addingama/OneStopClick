import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['access_token', 'refresh_token'],
  loginFailure: ['error', 'message'],
  socialLoginRequest: ['name', 'email', 'password'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  name: null,
  password: null,
  access_token: null,
  refresh_token: null,
  error: false,
  message: null,
  loggingIn: false
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { username, password }) =>
  state.merge({ loggingIn: true, username, password })

export const socialRequest = (state, { name, email, password }) =>
  state.merge({ loggingIn: true, name, email, password })

// successful api lookup
export const success = (state, { access_token, refresh_token }) => {
  return state.merge({ loggingIn: false, error: false, message: null, access_token, refresh_token })
}

// Something went wrong somewhere.
export const failure = (state, { message }) =>
  state.merge({ loggingIn: false, error: true, message, access_token: null, refresh_token: null })

// logout
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.SOCIAL_LOGIN_REQUEST]: socialRequest,
  [Types.LOGOUT]: logout
})

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.access_token !== null
