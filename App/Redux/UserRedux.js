import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userProfileRequest: ['accessToken'],
  userProfileSuccess: ['user'],
  userProfileFailure: null,
  userProfileUpdateRequest: ['accessToken', 'name', 'email', 'oldPassword', 'newPassword'],
  userProfileUpdateSuccess: ['user'],
  userProfileUpdateFailure: null,
  userReset: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  accessToken: null,
  fetching: false,
  error: false,
  message: null,
  name: null,
  email: null,
  oldPassword: null,
  newPassword: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const profileRequest = (state, { accessToken }) =>
  state.merge({ fetching: true, accessToken, user: null })

// successful api lookup
export const profileSuccess = (state, { user }) => {
  return state.merge({ fetching: false, error: false, user })
}

// Something went wrong somewhere.
export const profileFailure = state =>
  state.merge({ fetching: false, error: true, user: null })

// request the data from an api
export const profileUpdateRequest = (state, { accessToken, name, email, oldPassword, newPassword }) =>
  state.merge({ fetching: true, name, email, oldPassword, newPassword, accessToken })

// successful api lookup
export const profileUpdateSuccess = (state, { user }) => {
  return state.merge({ fetching: false, error: false, user })
}

// Something went wrong somewhere.
export const profileUpdateFailure = (state, {error, message}) =>
  state.merge({ fetching: false, error, message })

export const reset = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_PROFILE_REQUEST]: profileRequest,
  [Types.USER_PROFILE_SUCCESS]: profileSuccess,
  [Types.USER_PROFILE_FAILURE]: profileFailure,
  [Types.USER_PROFILE_UPDATE_REQUEST]: profileUpdateRequest,
  [Types.USER_PROFILE_UPDATE_SUCCESS]: profileUpdateSuccess,
  [Types.USER_PROFILE_UPDATE_FAILURE]: profileUpdateFailure,
  [Types.USER_RESET]: reset
})
