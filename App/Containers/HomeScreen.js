import React, { Component, PropTypes } from 'react'
import { Alert, ScrollView, Text, View, Image, Button, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DrawerNavigator } from 'react-navigation'
import { CustomInputField, CustomButton, HamburgerMenu } from '../Components/FormGenerator'
import { NavigationActions, } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProgressIndicator from '../Components/ProgressIndicator'
import * as RegistrationModel from '../Models/RegistrationModel'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import { validateField } from '../Lib/validator'
import RegistrationActions from '../Redux/RegistrationRedux'
import { cloneDeep } from 'lodash'
import { Header, Icon } from 'react-native-elements'
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    drawerIcon: ({ tintColor }) => {
      return (
        <MaterialIcons
          name='home'
          size={24}
          style={{ color: tintColor }}
        >
        </MaterialIcons>
      )
    }
  }

  static propTypes = {}

  constructor(props) {
    super(props)
  }

  openMenu() {
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    return (
      <View>
        <Header
          backgroundColor='#2F1F37'
          leftComponent={<HamburgerMenu onPress={this.openMenu.bind(this)} />}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
        />
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


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
