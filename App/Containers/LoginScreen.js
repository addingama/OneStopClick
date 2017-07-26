import React, { Component, PropTypes } from 'react'
import { View, Image, ScrollView, Text } from 'react-native'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import ProgressIndicator from '../Components/ProgressIndicator'
import LoginActions from '../Redux/LoginRedux'
import { Images } from '../Themes'
import { OscInputField, OscButton } from '../Lib/formGenerator'
import * as LoginModel from '../Models/LoginModel'
import { validateField } from '../Lib/validator'

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
      fields: LoginModel.login
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressLogin = this.handlePressLogin.bind(this)
  }

  updateState (newFieldState) {
    this.setState({fields: newFieldState})
  }

  validateFields () {
    var state = Object.assign({}, this.state)
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
      console.tron.log(email, password)
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

  render () {
    const {email, password} = Object.assign({}, this.state.fields)
    const { loggingIn, error } = this.props
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.titleLoginText}>Login</Text>
              <OscInputField
                field={email}
                editable={!loggingIn}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />
              <OscInputField
                field={password}
                editable={!loggingIn}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />

              <OscButton
                disabled={loggingIn}
                onPress={() => this.handlePressLogin()}
                style={styles.btnSignIn}
                title={I18n.t('signIn')}
              />

              <View style={styles.doNotHaveAccount}>
                <Text>Do not have an account?</Text>
                <Text style={[styles.registerText]} onPress={() => this.goToRegistrationScreen()}> Register!</Text>
              </View>
            </View>
            <ProgressIndicator show={loggingIn} text='Loggin you in' />
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
