import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  carouselBackground: {
    backgroundColor: Colors.charcoal
  },
  bulletStyle: {
    backgroundColor: 'red'
  },
  bulletsContainerStyle: { backgroundColor: Colors.backdrop, borderRadius: Metrics.containerRadius }
})
