import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import { NavigationActions } from 'react-navigation'
import * as Registration from '../Models/RegistrationModel'
import { Grid, Col, Row, Button } from 'react-native-elements';
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegistrationScreenStyle'

class RegistrationScreen extends Component {
  registration = {}
  constructor(props) {
    super(props)
  }

  focusNextField(nextField) {
    //  this.refs[nextField].focus();
  }

  goToLoginScreen() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    this.registration = Registration.Registration
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={styles.container}>
            <View style={styles.registrationContent}>
              <Text style={styles.titeRegText}>Registration</Text>
              <CustomInputField
                field={this.registration.username}
                refs={this.refs}
                onChangeText={(text) => console.log()}
                onSubmitEditing={() => this.focusNextField('email')}
              />
              <CustomInputField
                field={this.registration.email}
                onChangeText={(text) => console.log()}
                onSubmitEditing={() => this.focusNextField('password')}
              />
              <CustomInputField
                field={this.registration.password}
                onChangeText={(text) => console.log()}
                onSubmitEditing={() => this.focusNextField('password_confirmation')}
              />
              <CustomInputField
                field={this.registration.password_confirmation}
                onChangeText={(text) => console.log()}
                onSubmitEditing={() => console.log()}
              />
              <CustomButton
                title='Register'
              />
              <View style={styles.alreadyHaveAccountContent}>
                <Text>Already have an account?</Text>
                <Text style={[styles.loginText]} onPress={() => this.goToLoginScreen()}> Login!</Text>
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


    /*<View style={[styles.mainContainer,styles.backgroundImage]}>
        <ScrollView style={[styles.container,styles.backgroundImage]}>

      </ScrollView>
    </View>*/