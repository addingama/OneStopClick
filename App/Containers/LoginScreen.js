import React, { Component, PropTypes } from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import ProgressIndicator from '../Components/ProgressIndicator'
import LoginActions from '../Redux/LoginRedux'
import { Images } from '../Themes'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import * as LoginModel from '../Models/LoginModel'
import { validateField } from '../Lib/validator'
import { cloneDeep } from 'lodash'
import { LoginManager } from 'react-native-fbsdk'
import styles from './Styles/LoginScreenStyle'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;


class LoginScreen extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggingIn: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    access_token: PropTypes.string,
    refresh_token: PropTypes.string,
    attemptLogin: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fields: cloneDeep(LoginModel.login)
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.goToHomeScreen = this.goToHomeScreen.bind(this)
    this.responseInfoCallback = this.responseInfoCallback.bind(this)
  }

  updateState(newFieldState) {
    this.setState({ fields: newFieldState })
  }

  validateFields() {
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

  handlePressLogin() {
    if (this.validateFields()) {
      const { email, password } = this.state.fields
      this.props.attemptLogin(email.value, password.value)
    }
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate()
    if (!newProps.loggingIn && !newProps.error) {
      this.goToHomeScreen()
    }
  }

  goToRegistrationScreen() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'RegistrationScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  goToHomeScreen() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'HomeScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  goToForgotPasswordScreen() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'ForgotPasswordScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }


  //Create response callback.
  responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      console.tron.log(error, result)
      alert('Error fetching data: ' + error.toString())
    } else {
      this.props.attemptSocialLogin(result.email, result.name)
    }
  }

  handleFacebookLogin() {
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
              this.responseInfoCallback,
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


  handleGoogleLogin() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
      })
        .then(() => {
          GoogleSignin.signIn()
            .then((user) => {
              this.props.attemptSocialLogin(user.email, user.name)
            })
            .catch((err) => {
              alert(err);
            })
            .done();
        });
      // play services are available. can now configure library
    })
      .catch((err) => {
        alert("Play services error", err.code, err.message);
      })
  }

  render() {
    const { email, password } = this.state.fields
    const { loggingIn, error } = this.props
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={styles.scrollCenterContainer}>
          <View style={styles.customContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.screenTitleText}>{I18n.t('login')}</Text>
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
                <Button
                  onPress={this.handleFacebookLogin}
                  title="Continue with Facebook"
                  disabled={loggingIn}
                  color="white"
                  backgroundColor="#4267B2"
                  fontWeight='bold'
                  marginTop='20'
                />
              </View>
              <View style={styles.socialAccountButton}>
                <Button
                  onPress={this.handleGoogleLogin.bind(this)}
                  title="Continue with Google"
                  disabled={loggingIn}
                  color="white"
                  backgroundColor="#db3236"
                  fontWeight='bold'
                  marginTop='20'
                />
              </View>
            </View>
            <ProgressIndicator show={loggingIn} text={I18n.t('LogginIn')} />
          </View>
        </ScrollView>
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
    attemptSocialLogin: (username, name) => dispatch(LoginActions.socialLoginRequest(username, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
