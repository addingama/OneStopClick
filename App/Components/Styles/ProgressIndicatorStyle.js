import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  messageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backdrop,
    padding: Metrics.baseMargin,
    borderRadius: Metrics.containerRadius,
    position: 'absolute',
    alignSelf: 'center',
    marginLeft: Metrics.doubleBaseMargin,
    marginRight: Metrics.doubleBaseMargin
  },
  messageText: {
    textAlign: 'center',
    fontSize: 12,
    paddingTop: Metrics.baseMargin,
    color: Colors.snow
  }
})
