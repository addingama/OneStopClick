import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  btnUpdate: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
  noteContainer: {
    margin: Metrics.doubleBaseMargin
  },
  smallText: {
    fontSize: Metrics.fontSize.small
  }
})
