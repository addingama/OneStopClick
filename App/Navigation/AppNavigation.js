import { DrawerNavigator, StackNavigator } from 'react-navigation'
import AccountScreen from '../Containers/AccountScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import HomeScreen from '../Containers/HomeScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import styles from './Styles/NavigationStyles'

const AccountStack = StackNavigator({
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  AccountScreen: { screen: AccountScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LoginScreen: { screen: LoginScreen }
}, {
  stateName: 'AccountStack',
  headerMode: 'none',
  initialRouteName: 'AccountScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimaryNav = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Account: {
      screen: AccountStack
    }
  },
  {
    stateName: 'PrimaryNav',
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }

)

export default PrimaryNav
