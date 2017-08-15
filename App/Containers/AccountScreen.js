import React from 'react'
import { ScrollView, View, Alert, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import StorageService from '../Services/StorageService'
import AccountDrawerBase from './Bases/AccountDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'

// Styles
import styles from './Styles/AccountScreenStyle'

class AccountScreen extends AccountDrawerBase {
  static navigationOptions = AccountDrawerBase.getNavigationOptions()

  componentWillMount () {
    StorageService.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.goToLogin()
      }
    })
  }

  handlePressEdit () {
    alert('Open edit profile')
  }

  handlePresslogout () {
    Alert.alert(
      I18n.t('message'),
      I18n.t('logoutConfirmation'),
      [
        { text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed') },
        { text: I18n.t('ok'), onPress: () => this.logout() }
      ],
      { cancelable: false }
    )
  }

  goToLogin () {
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

  logout () {
    // clear data here
    const resetAction = NavigationActions.navigate({
      routeName: 'Home',
      params: {},
      action: NavigationActions.navigate({ routeName: 'Home' })
    })
    StorageService.removeSession()
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    return (
      <View>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('account')} {...this.props} />
        </View>
        <ScrollView>
          <View>
            <View style={[styles.whiteSection, {flex: 1, flexDirection: 'row'}]}>
              <View>
                <Text style={styles.boldMediumText}>Addin Gama Bertaqwa</Text>
                <Text style={styles.smallText}>addingama.bertaqwa@mitrais.com</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.handlePressEdit()}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.whiteSection, {flex: 1, alignItems: 'center'}]}>
              <TouchableOpacity onPress={() => this.handlePresslogout()}>
                <Text style={styles.logoutButton}>{I18n.t('logOut')}</Text>
              </TouchableOpacity>
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
