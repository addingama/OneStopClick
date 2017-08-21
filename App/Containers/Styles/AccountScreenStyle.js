import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  whiteSection: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    marginBottom: Metrics.baseMargin,
    shadowColor: Colors.coal,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  boldMediumText: {
    fontSize: Metrics.fontSize.medium,
    fontWeight: 'bold'
  },
  smallText: {
    fontSize: Metrics.fontSize.small
  },
  editButton: {
    color: Colors.green
  },
  logoutButton: {
    color: Colors.error
  }
})
