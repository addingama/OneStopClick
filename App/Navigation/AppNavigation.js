import { StackNavigator } from 'react-navigation'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import HomeScreen from '../Containers/HomeScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  HomeScreen: { screen: HomeScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: { screen: LoginScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
