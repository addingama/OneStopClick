import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
  productPrice: {
    paddingTop: 5,
    fontSize: 12,
    color: '#d98434',
    textAlign: 'right'
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
  deleteContainer: {
    width: 30,
    height: 60
  },
  delete: {
    color: 'red',
    textAlign: 'right'
  }
})
