import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  childDrawerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  parentDrawerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey'
  },
  parentViewDrawerLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    paddingLeft: 15,
    paddingRight:10,
    width: '100%',
    borderTopWidth:1,
    borderColor: '#e0e2e5'
  },
  viewDrawerLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    paddingLeft: 10,
    width: '100%',
  }
})
