import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  titeRegText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  formContainer: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
    paddingBottom: Metrics.baseMargin
  },
  btnReg: {
    marginTop: Metrics.doubleBaseMargin
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
  }
})
