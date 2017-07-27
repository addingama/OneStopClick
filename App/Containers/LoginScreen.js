import React, { Component, PropTypes } from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
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

import styles from './Styles/LoginScreenStyle'

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

  constructor (props) {
    super(props)
    this.state = {
      fields: cloneDeep(LoginModel.login)
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressLogin = this.handlePressLogin.bind(this)
  }

  updateState (newFieldState) {
    this.setState({fields: newFieldState})
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

  goToRegistrationScreen () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'RegistrationScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  goToForgotPasswordScreen() {
    alert('Go to forgot password screen')
  }

  render () {
    const {email, password} = this.state.fields
    const { loggingIn, error } = this.props
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.titleLoginText}>{I18n.t('login')}</Text>
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
                  <Text style={[styles.registerText]}> {I18n.t('register')}</Text>
                </TouchableOpacity>
                
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
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)