import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  cartContainer: {
    backgroundColor: 'red',
    marginTop: 0,
    overflow: 'hidden'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: '#ccc',
    height: 50,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalText: {
    fontWeight: 'bold',
    paddingLeft: 20,
    flex: 0.5
  },
  totalNumber: {
    flex: 0.3,
    textAlign: 'center',
    fontSize: 12,
    color: '#d98434',
    fontWeight: 'bold'
  },
  checkout: {
    flex: 0.2,
    height: 20,
    borderWidth: 2,
    borderColor: '#d98434',
    color: '#d98434',
    borderRadius: 10,
    fontSize: 10,
    textAlign: 'center',
    padding: 8,
    fontWeight: 'bold'
  }
})
