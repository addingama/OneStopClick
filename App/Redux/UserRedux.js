import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userProfileRequest: ['accessToken'],
  userProfileSuccess: ['user'],
  userProfileFailure: null,
  userReset: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  access_token: null,
  fetching: false,
  error: false,
  message: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const profileRequest = (state, { access_token }) =>
  state.merge({ fetching: true, access_token, user: null })

// successful api lookup
export const profileSuccess = (state, { user }) => {
  return state.merge({ fetching: false, error: false, user })
}

// Something went wrong somewhere.
export const profileFailure = state =>
  state.merge({ fetching: false, error: true, user: null })

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_PROFILE_REQUEST]: profileRequest,
  [Types.USER_PROFILE_SUCCESS]: profileSuccess,
  [Types.USER_PROFILE_FAILURE]: profileFailure,
  [Types.USER_RESET]: reset
})
