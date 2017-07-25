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
    this.state = {
      username: '',
      password: ''
    }
  }

  updateState (e) {
    var state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render () {
    const {email, password} = LoginModel.Login

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <OscInputField
                field={email}
                onChangeText={(text) => console.tron.log(text)}
                onSubmitEditing={(event) => console.tron.log(event)}
              />
              <OscInputField
                field={password}
                onChangeText={(text) => console.tron.log(text)}
                onSubmitEditing={(event) => alert('loggin in')}
              />

              <OscButton
                title='Sign In'
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
