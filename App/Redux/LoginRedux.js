import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['accessToken', 'refreshToken'],
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
  accessToken: null,
  refreshToken: null,
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
export const success = (state, { accessToken, refreshToken }) => {
  return state.merge({ loggingIn: false, error: false, message: null, accessToken, refreshToken })
}

// Something went wrong somewhere.
export const failure = (state, { message }) =>
  state.merge({ loggingIn: false, error: true, message, accessToken: null, refreshToken: null })

// logout
export const logout = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.SOCIAL_LOGIN_REQUEST]: socialRequest,
  [Types.LOGOUT]: logout
})

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.accessToken !== null
