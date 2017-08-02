import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  btnSignIn: {
    marginTop: Metrics.doubleBaseMargin
  },
  forgotPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
  doNotHaveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.doubleBaseMargin
  },
  socialAccountButton: {
    marginTop: Metrics.doubleBaseMargin,
    margin: 0
  },
  googleButton: {
    backgroundColor: Colors.google
  }
})
