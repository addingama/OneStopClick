import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  btnReset: {
    marginTop: Metrics.doubleBaseMargin
  },
  rememberPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin
  }
})
