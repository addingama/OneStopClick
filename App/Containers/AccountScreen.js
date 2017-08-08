import React, { Component } from 'react'
import { ScrollView, Text, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header, Icon } from 'react-native-elements'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import HideableView from 'react-native-hideable-view'
import StorageService from '../Services/StorageService'
import { CustomButton, HamburgerMenu } from '../Components/FormGenerator'
import { isLoggedIn } from '../Redux/LoginRedux'
import AccountDrawerBase from './Bases/AccountDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'

// Styles
import styles from './Styles/AccountScreenStyle'


class AccountScreen extends AccountDrawerBase {
  
  static navigationOptions = AccountDrawerBase.getNavigationOptions()

  componentWillMount() {
    StorageService.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.goToLogin()
      }
    })
    
  }

  handlePresslogout() {
    Alert.alert(
      I18n.t('message'),
      I18n.t('logoutConfirmation'),
      [
        { text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed') },
        { text: I18n.t('ok'), onPress: () => this.logout() },
      ],
      { cancelable: false }
    )
  }

  goToLogin() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ 
          routeName: 'LoginScreen',
          params: {}
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  logout() {
    // clear data here
    const resetAction = NavigationActions.navigate({ 
      routeName: 'Home',
      params: {},
      action: NavigationActions.navigate({ routeName: 'Home'})
    })
    StorageService.removeSession()
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <View>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('account')} {...this.props}/>
        </View>
        <ScrollView contentContainerStyle={[styles.scrollCenterContainer]}>
          <View style={styles.customContainer}>
            <View style={[styles.formContainer]}>
                <CustomButton
                  onPress={() => this.handlePresslogout()}
                  style={styles.btnSignIn}
                  title={I18n.t('logOut')}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)