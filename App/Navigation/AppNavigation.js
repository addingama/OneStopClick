import { DrawerNavigator, StackNavigator, DrawerItem } from 'react-navigation'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import HomeScreen from '../Containers/HomeScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import styles from './Styles/NavigationStyles'

const PrimaryNav = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }

)
// // Manifest of possible screens
const StackNav = StackNavigator({
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  HomeScreen: { screen: HomeScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: { screen: LoginScreen },
  Drawer: {
    screen: PrimaryNav,
    navigationOptions: {
      header: {
        visible: false
      }
    }}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default StackNav
