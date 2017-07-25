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
  container: {
    flex: 1,
    justifyContent: 'center'
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
  doNotHaveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
})
