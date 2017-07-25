import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    justifyContent: 'center'
  },
  formContainer: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius
  },
  btnSignIn: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  }
})
