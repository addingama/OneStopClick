import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  titleLoginText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Metrics.navBarHeight
  },
  formContainer: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
    paddingBottom: Metrics.baseMargin
  },
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
  registerText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
