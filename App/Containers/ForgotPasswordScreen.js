import React, { Component, PropTypes } from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import ProgressIndicator from '../Components/ProgressIndicator'
import { Images } from '../Themes'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import * as ForgotModel from '../Models/ForgotPasswordModel'
import { validateField } from '../Lib/validator'
import { cloneDeep } from 'lodash'

// Styles
import styles from './Styles/ForgotPasswordStyle'

class ForgotPasswordScreen extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    processing: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    attempResetPassword: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      fields: cloneDeep(ForgotModel.fields)
    }
    this.updateState = this.updateState.bind(this)
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
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={styles.scrollCenterContainer}>
          <View style={styles.customContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.screenTitleText}>{I18n.t('forgotPassword')}</Text>
              <CustomInputField
                field={email}
                editable={!processing}
                state={this.state.fields}
                updateState={this.updateState}
              />
            
              <CustomButton
                disabled={processing}
                onPress={() => alert('pressed')}
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
