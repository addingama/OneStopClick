import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    padding: 10,
    marginTop: 5
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10
  },
  productTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  },
  productDesc: {
    color: 'black',
    fontSize: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#929caa'
  },
  download: {
    marginTop: 10,
    paddingTop: 3,
    height: 25,
    fontSize: 15,
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.navbar
  }
})
