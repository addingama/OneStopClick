import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Platform } from 'react-native'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { GoogleSignin } from 'react-native-google-signin'
import { cloneDeep } from 'lodash'
import { LoginManager } from 'react-native-fbsdk'
import { SocialIcon } from 'react-native-elements'
import ProgressIndicator from '../Components/ProgressIndicator'
import LoginActions from '../Redux/LoginRedux'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import * as LoginModel from '../Models/LoginModel'
import { validateField } from '../Lib/validator'
import AccountDrawerBase from './Bases/AccountDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'
import styles from './Styles/LoginScreenStyle'

const FBSDK = require('react-native-fbsdk')
const {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK

class LoginScreen extends AccountDrawerBase {
  static propTypes = {
    dispatch: PropTypes.func,
    loggingIn: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    access_token: PropTypes.string,
    refresh_token: PropTypes.string,
    attemptLogin: PropTypes.func.isRequired
  }

  static navigationOptions = AccountDrawerBase.getNavigationOptions()

  constructor (props) {
    super(props)
    this.state = {
      fields: cloneDeep(LoginModel.login)
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.goToHomeScreen = this.goToHomeScreen.bind(this)
    this.goToForgotPasswordScreen = this.goToForgotPasswordScreen.bind(this)
    this.responseInfoCallback = this.responseInfoCallback.bind(this)
  }

  updateState (newFieldState) {
    this.setState({ fields: newFieldState })
  }

  validateFields () {
    var state = this.state
    var isValid = true
    Object.keys(state.fields).map((field) => {
      const result = validateField(state.fields, field)
      this.updateState(result)
      if (!result[field].valid) {
        isValid = false
      }
    })
    return isValid
  }

  handlePressLogin () {
    if (this.validateFields()) {
      const { email, password } = this.state.fields
      this.props.attemptLogin(email.value, password.value)
    }
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (!newProps.loggingIn && !newProps.error) {
      this.goToHomeScreen()
    }
  }

  goToRegistrationScreen () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'RegistrationScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  goToHomeScreen () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'AccountScreen',
          params: {}
        })
      ]
    })
    const goHome = NavigationActions.navigate({
      routeName: 'Home',
      params: {}
    })
    this.props.navigation.dispatch(resetAction)
    this.props.navigation.dispatch(goHome)
  }

  goToForgotPasswordScreen () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'ForgotPasswordScreen',
          params: {}
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  // Create response callback.
  responseInfoCallback (error: ?Object, result: ?Object) {
    if (error) {
      console.tron.log(error, result)
      alert('Error fetching data: ' + error.toString())
    } else {
      let password = Math.random().toString(36).substring(7)
      this.props.attemptSocialLogin(result.name, result.email, password)
    }
  }

  handleFacebookLogin () {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      // LoginManager.logOut()
      if (result.isCancelled) {
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            // alert(data.accessToken.toString())
            // Create a graph request asking for user information with a callback to handle the response.
            const infoRequest = new GraphRequest(
              '/me?fields=id,name,last_name,email',
              null,
              this.responseInfoCallback
            )
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start()
          }
        )
      }
    },
      function (error) {
        alert('Login fail with error: ' + error)
      }
    )
  }

  handleGoogleLogin () {
    if (Platform.OS === 'ios') {
      this.doGoogleLogin()
    } else if (Platform.OS === 'android') {
      GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        this.doGoogleLogin()
      })
      .catch((err) => {
        alert('Play services error', err.code, err.message)
      })
    }
  }

  doGoogleLogin () {
    GoogleSignin.configure({
      iosClientId: '959083237888-4ttpibeopc7366kpqs37cpi7k1dg9a60.apps.googleusercontent.com',
      scopes: ['profile'],
      shouldFetchBasicProfile: true
    })
    .then(() => {
      GoogleSignin.signIn()
        .then((user) => {
          this.responseInfoCallback(false, user)
        })
        .catch((err) => {
          alert(err)
        })
        .done()
    })
  }

  render () {
    const { email, password } = this.state.fields
    const { loggingIn, error } = this.props
    return (
      <View style={{flex: 1}}>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('signIn')} {...this.props} />
        </View>
        <View style={styles.fragmentContainer}>
          <ScrollView >
            <View style={styles.customContainer}>
              <View style={styles.formContainer}>
                <CustomInputField
                  field={email}
                  editable={!loggingIn}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomInputField
                  field={password}
                  editable={!loggingIn}
                  state={this.state.fields}
                  updateState={this.updateState}
                />

                <CustomButton
                  disabled={loggingIn}
                  onPress={() => this.handlePressLogin()}
                  style={styles.btnSignIn}
                  title={I18n.t('signIn')}
                />

                <View style={styles.forgotPassword}>
                  <TouchableOpacity onPress={() => this.goToForgotPasswordScreen()}>
                    <Text>{I18n.t('forgotYourPassword?')}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.doNotHaveAccount}>
                  <Text>{I18n.t('doNotHaveAnAccount?')}</Text>
                  <TouchableOpacity onPress={() => this.goToRegistrationScreen()}>
                    <Text style={[styles.linkActionText]}> {I18n.t('register')}</Text>
                  </TouchableOpacity>

                </View>
                <View style={styles.socialAccountButton}>
                  <SocialIcon
                    onPress={this.handleFacebookLogin}
                    button
                    type='facebook'
                    title={I18n.t('continueWithFacebook')}
                    disabled={loggingIn}
                  />
                </View>
                <View style={styles.socialAccountButton}>
                  <SocialIcon
                    button
                    type='google'
                    onPress={this.handleGoogleLogin.bind(this)}
                    title={I18n.t('continueWithGoogle')}
                    disabled={loggingIn}
                    style={styles.googleButton}
                  />
                </View>
              </View>
              <ProgressIndicator show={loggingIn} text={I18n.t('LogginIn')} />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggingIn: state.login.loggingIn,
    error: state.login.error,
    message: state.login.message,
    access_token: state.login.access_token,
    refresh_token: state.login.refresh_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    attemptSocialLogin: (name, email, password) => dispatch(LoginActions.socialLoginRequest(name, email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
