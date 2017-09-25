import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import ExternalAPI from '../Services/ExternalApi'

/* ------------- Types ------------- */
import { LoginTypes } from '../Redux/LoginRedux'
import { RegistrationTypes } from '../Redux/RegistrationRedux'
import { ForgotPasswordTypes } from '../Redux/ForgotPasswordRedux'
import { ProductTypes } from '../Redux/ProductRedux'
import { UserTypes } from '../Redux/UserRedux'
import { CartTypes } from '../Redux/CartRedux'
/* ------------- Sagas ------------- */
import { login, socialLogin } from './LoginSagas'
import { registration } from './RegistrationSagas'
import { forgotPassword } from './ForgotPasswordSagas'
import { getProducts } from './ProductSagas'
import { getUserProfile, updateUserProfile } from './UserSagas'
import { getCurrency, getItems, addItem } from './CartSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()
const exapi = ExternalAPI.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(RegistrationTypes.REGISTRATION_REQUEST, registration, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(LoginTypes.SOCIAL_LOGIN_REQUEST, socialLogin, api),
    takeLatest(ProductTypes.GET_PRODUCTS_REQUEST, getProducts, api),
    takeLatest(UserTypes.USER_PROFILE_REQUEST, getUserProfile, api),
    takeLatest(UserTypes.USER_PROFILE_UPDATE_REQUEST, updateUserProfile, api),
    takeLatest(CartTypes.CART_ADD_ITEM_REQUEST, addItem, api),
    takeLatest(CartTypes.CART_GET_CURRENCY, getCurrency, exapi),
    takeLatest(CartTypes.CART_GET_ITEMS, getItems, api)
  ]
}
