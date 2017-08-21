import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    login: require('./LoginRedux').reducer,
    registration: require('./RegistrationRedux').reducer,
    forgotPassword: require('./ForgotPasswordRedux').reducer,
    product: require('./ProductRedux').reducer,
    user: require('./UserRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
