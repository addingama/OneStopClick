import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import { NavigationActions } from 'react-navigation'
import * as RegistrationModel from '../Models/RegistrationModel'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import { validateField } from '../Lib/validator'

import styles from './Styles/RegistrationScreenStyle'

class RegistrationScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fields: RegistrationModel.registration
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressRegister = this.handlePressRegister.bind(this)
  }

  updateState (newFieldState) {
    this.setState({ fields: newFieldState })
    console.tron.log(this.state)
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

      if (isValid && field === 'password_confirmation') {
        if (state.fields.password.value !== state.fields.password_confirmation.value) {
          isValid = false
          state.fields.password_confirmation.message = I18n.t('unmatchedPassword')
          state.fields.password_confirmation.valid = false
        } else {
          field.message = ''
          field.valid = true
        }
      }
    })
    return isValid
  }

  handlePressRegister () {
    if (this.validateFields()) {
      alert('registering')
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
    const { password, email, username, password_confirmation } = Object.assign({}, this.state.fields)

    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode='stretch' />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.titeRegText}>{I18n.t('registration')}</Text>
              <CustomInputField
                field={username}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />
              <CustomInputField
                field={email}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />
              <CustomInputField
                field={password}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />
              <CustomInputField
                field={password_confirmation}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />
              <CustomButton
                onPress={() => this.handlePressRegister()}
                style={styles.btnReg}
                title={I18n.t('register')}
              />
              <View style={styles.alreadyHaveAccountContent}>
                <Text>{I18n.t('alreadyHaveAnAccount?')} </Text>
                <Text style={[styles.loginText]} onPress={() => this.goToLoginScreen()}>{I18n.t('login')}!</Text>
              </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
