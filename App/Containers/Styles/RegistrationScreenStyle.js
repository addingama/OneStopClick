import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  titeRegText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  alreadyHaveAccountContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  registrationContent: {
    backgroundColor: 'white',
    margin: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin
  },
  container : {
    flex:1,
    justifyContent: 'center'
  }
})
