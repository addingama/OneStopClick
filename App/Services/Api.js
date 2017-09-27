// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://onestopclick.tk/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 60000
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future. But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = (username, password) => api.post('api/auth/token', {
    username, password
  })

  const socialLogin = (name, email) => api.post('api/social_login', {
    name, email
  })

  const registration = (name, email, password, passwordConfirmation) => api.post('api/auth/register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation
  })

  const forgotPassword = (email) => api.post('api/forgot_password', { email })

  const getProducts = () => api.get('home/products')

  const getUserProfile = (accessToken) => api.get('api/getuserdetails', {}, {headers: {'Authorization': 'Bearer ' + accessToken}})

  const updateUserProfile = (accessToken, name, email, oldPassword, newPassword) => api.post('api/change-profile', {
    name,
    email,
    old_password: oldPassword,
    new_password: newPassword
  }, {headers: {'Authorization': 'Bearer ' + accessToken}})

  // Cart API
  const getCart = (accessToken) => api.get('api/chart/get', {}, {headers: {'Authorization': 'Bearer ' + accessToken}})

  const addToCart = (accessToken, productId, numberOfItems) => api.post('api/chart/add', {product_id: productId, number_of_items: numberOfItems}, {headers: {'Authorization': 'Bearer ' + accessToken}})

  const removeFromCart = (accessToken, productId) => api.delete('api/chart/remove/' + productId, { }, {headers: {'Authorization': 'Bearer ' + accessToken}})

  // Paypall payment
  const sendPaymentId = (accessToken, paymentId, paymentCode, cartId) => api.post('api/payment/create', {chart_id: cartId, payment_code: paymentCode, voucher_code: '', payment_id: paymentId}, {headers: {'Authorization': 'Bearer ' + accessToken}})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,
    registration,
    forgotPassword,
    socialLogin,
    getProducts,
    getUserProfile,
    updateUserProfile,
    getCart,
    addToCart,
    removeFromCart,
    sendPaymentId
  }
}

// let's return back our create method as the default.
export default {
  create
}
