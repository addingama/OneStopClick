import React, { Component } from 'react'
import { View, Image, ScrollView, Text } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import { OscInputField, OscButton } from '../Lib/formGenerator'
import * as LoginModel from '../Models/LoginModel'
import { validateField } from '../Lib/validator'

import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      fields: LoginModel.login
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressLogin = this.handlePressLogin.bind(this)
  }

  updateState (newFieldState) {
    this.setState({ fields: newFieldState})
    console.tron.log(this.state)
  }

  validateFields() {
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

  handlePressLogin() {
    if (this.validateFields()) {
      alert('loggin in')
    } else {
      alert('field error')
    }
  }

  render () {
    const {email, password} = Object.assign({}, this.state.fields)

    return ( 
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <OscInputField
                field={email}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />
              <OscInputField
                field={password}
                state={Object.assign({}, this.state.fields)}
                updateState={this.updateState}
              />

              <OscButton
                onPress={() => this.handlePressLogin()}
                style={styles.btnSignIn}
                title={I18n.t('signIn')}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
