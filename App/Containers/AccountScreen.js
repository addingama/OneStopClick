import React, { Component } from 'react'
import { ScrollView, Text, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header, Icon } from 'react-native-elements'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import StorageService from '../Services/StorageService'
import { CustomButton, HamburgerMenu } from '../Components/FormGenerator'

// Styles
import styles from './Styles/AccountScreenStyle'


class AccountScreen extends Component {
  static navigationOptions = {
    title: 'Account',
    drawerIcon: ({ tintColor }) => {
      return (
        <MaterialIcons
          name='account-circle'
          size={24}
          style={{ color: tintColor }}
        >
        </MaterialIcons>
      )
    }
  }
  openMenu() {
    this.props.navigation.navigate('DrawerOpen')
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

  logout() {
    // clear data here
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
      ]
    })
    StorageService.removeSession()
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <View>
        <View style={styles.hasNavbar}>
          <Header
            backgroundColor='#2F1F37'
            leftComponent={<HamburgerMenu onPress={this.openMenu.bind(this)} />}
            centerComponent={{ text: 'Account', style: { color: '#fff' } }}
          />
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