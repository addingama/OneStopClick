import React, { PropTypes } from 'react'
import { ScrollView, View, Alert, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import StorageService from '../Services/StorageService'
import AccountDrawerBase from './Bases/AccountDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'
import UserActions from '../Redux/UserRedux'
import LoginActions from '../Redux/LoginRedux'

// Styles
import styles from './Styles/AccountScreenStyle'

class AccountScreen extends AccountDrawerBase {
  static navigationOptions = AccountDrawerBase.getNavigationOptions()

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    access_token: PropTypes.string,
    user: PropTypes.object,
    attempGetProfile: PropTypes.func.isRequired,
    resetLogin: PropTypes.func,
    resetUser: PropTypes.func
  }

  componentDidMount () {
    StorageService.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.goToLogin()
      }
    })
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (!newProps.fetching && newProps.user == null && !newProps.error && newProps.access_token != null) {
      this.props.attempGetProfile(newProps.access_token)
    }
  }

  handlePressEdit () {
    this.props.navigation.navigate('EditProfileScreen')
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
    // dispatch reset login and user state
    this.props.resetLogin()
    this.props.resetUser()
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    const { user } = this.props
    return (
      <View>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('account')} {...this.props} />
        </View>
        <ScrollView>
          <View>
            <View style={[styles.whiteSection, {flex: 1, flexDirection: 'row'}]}>
              <View>
                <Text style={styles.boldMediumText}>{user == null ? '' : user.name}</Text>
                <Text style={styles.smallText}>{user == null ? '' : user.email}</Text>
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
    fetching: state.user.fetching,
    error: state.user.error,
    message: state.user.message,
    access_token: state.login.access_token,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attempGetProfile: (accessToken) => dispatch(UserActions.userProfileRequest(accessToken)),
    resetLogin: () => dispatch(LoginActions.logout()),
    resetUser: () => dispatch(UserActions.userReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
