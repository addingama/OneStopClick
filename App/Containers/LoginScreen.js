import React, { Component } from 'react'
import { View, Image, ScrollView, Text } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import { OscInputField, OscButton } from '../Lib/formGenerator'
import * as LoginModel from '../Models/LoginModel'

import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = LoginModel.login
    this.updateState = this.updateState.bind(this)
  }

  updateState (newFieldState) {
    this.setState(newFieldState)
    console.tron.log(newFieldState)
  }

  render () {
    const {email, password} = Object.assign({}, this.state)

    return ( 
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <OscInputField
                field={email}
                state={Object.assign({}, this.state)}
                updateState={this.updateState}
              />
              <OscInputField
                field={password}
                state={Object.assign({}, this.state)}
                updateState={this.updateState}
              />

              <OscButton
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
