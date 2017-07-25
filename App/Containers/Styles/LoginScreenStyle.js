import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
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
