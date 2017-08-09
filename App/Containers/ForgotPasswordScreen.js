import React, { Component, PropTypes } from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Header, Icon } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProgressIndicator from '../Components/ProgressIndicator'
import ForgotActions from '../Redux/ForgotPasswordRedux'
import { Images } from '../Themes'
import { CustomInputField, CustomButton, HamburgerMenu } from '../Components/FormGenerator'
import * as ForgotModel from '../Models/ForgotPasswordModel'
import { validateField } from '../Lib/validator'
import AccountDrawerBase from './Bases/AccountDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'
import { cloneDeep } from 'lodash'

// Styles
import styles from './Styles/ForgotPasswordStyle'

class ForgotPasswordScreen extends AccountDrawerBase {

  static propTypes = {
    dispatch: PropTypes.func,
    processing: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    attempResetPassword: PropTypes.func.isRequired
  }

  static navigationOptions = AccountDrawerBase.getNavigationOptions()

  constructor (props) {
    super(props)
    this.state = {
      fields: cloneDeep(ForgotModel.fields)
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressReset = this.handlePressReset.bind(this)
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

  handlePressReset () {
    if (this.validateFields()) {
      const { email } = this.state.fields
      this.props.attempResetPassword(email.value)
    }
  }
  
  goToLoginScreen () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
  

  render () {
    const {email} = this.state.fields
    const { processing, error } = this.props
    return (
      <View style={{flex: 1}}>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('forgotPassword')} {...this.props}/>
        </View>
        <View style={styles.fragmentContainer}>
          <ScrollView >
            <View style={styles.customContainer}>
              <View style={styles.formContainer}>
                <CustomInputField
                  field={email}
                  editable={!processing}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
              
                <CustomButton
                  disabled={processing}
                  onPress={() => this.handlePressReset()}
                  style={styles.btnReset}
                  title={I18n.t('sendPasswordResetLink')}
                />

                <View style={styles.rememberPassword}>
                  <TouchableOpacity onPress={() => this.goToLoginScreen()}>
                    <Text>{I18n.t('rememberYourPassword?')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ProgressIndicator show={processing} />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    processing: state.forgotPassword.processing,
    error: state.forgotPassword.error,
    message: state.forgotPassword.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attempResetPassword: (email) => dispatch(ForgotActions.forgotPasswordRequest(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
