import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import ListCart from '../Components/ListCart.js'
import BackHeader from '../Components/BackHeader'
import CartActions from '../Redux/CartRedux'
import TransactionHistoryActions from '../Redux/TransactionHistoryRedux'
import PayPal from 'react-native-paypal-wrapper'
import I18n from 'react-native-i18n'
import { currency } from '../Lib/numberFormatter.js'
import Toast from 'react-native-toast-native'
import Reactotron from 'reactotron-react-native'

// Styles
import styles from './Styles/CartDetailScreenStyle'
import { Colors } from '../Themes/'

class CartDetailScreen extends Component {
  componentWillMount () {
    this.props.getRate()
  }

  payNow () {
    const style = {
      backgroundColor: Colors.errorToast,
      width: 300,
      height: Platform.OS === ('ios') ? 50 : 100,
      color: '#ffffff',
      fontSize: 12,
      lineHeight: 2,
      lines: 4,
      borderRadius: 15,
      fontWeight: 'bold',
      yOffset: 40
    }
    // checking user login
    const { user } = this.props
    if (user === null) {
      Toast.show('Please sign in before continue', Toast.SHORT, Toast.TOP, style)
    } else {
      if (this.totalCount() > 0) {
        var total = this.covertToUsd()
        if (total === 0) {
          alert('Failed to convert currency.')
        } else {
          // PayPal.initialize(PayPal.PRODUCTION, 'AYshIbtN2_ZHCg3wz1jV6a9Bc62bfqWK3h1YbCDAsGxbnYIwjL5hJIAlWdEMrRcq9rJ5pzw6slOge9PH')
          PayPal.initialize(PayPal.SANDBOX, 'AWP4eLNwBrtKnPUCXFKYYoJITd57H-bE4j7DpdxMkPCWX46-t4goWpN1EE7bFtDGG4BrfWuaafGwL4ti')
          PayPal.pay({
            price: total.toString(),
            currency: 'USD',
            description: 'One Stop Click Payment'
          }).then(confirm => this.transactionHistory(confirm))
          .catch(error => console.tron.log(error))
        }
      } else {
        Toast.show('Your cart has 0 items', Toast.SHORT, Toast.TOP, style)
      }
    }
  }

  covertToUsd () {
    const { rates } = this.props
    if (rates.IDR === 0 || rates.length === 0) {
      return 0
    } else {
      var usdTotal = this.totalCount() / parseFloat(rates.IDR)
      return usdTotal.toFixed(2)
    }
  }

  totalCount () {
    const { cartItems } = this.props
    var totalPayment = 0
    for (var i = 0; i < cartItems.length; i++) {
      var price = parseFloat(cartItems[i].product.price)
      totalPayment = totalPayment + price
    }
    return totalPayment
  }

  transactionHistory (confirm) {
    const { accessToken, cartItems } = this.props
    const style = {
      backgroundColor: Colors.successToast,
      width: 300,
      height: Platform.OS === ('ios') ? 50 : 100,
      color: '#ffffff',
      fontSize: 12,
      lineHeight: 2,
      lines: 4,
      borderRadius: 15,
      fontWeight: 'bold',
      yOffset: 40
    }

    // push to API here
    Reactotron.display({
      name: 'Paypal response',
      value: confirm,
      preview: JSON.stringify(confirm).substr(0, 500)
    })

    console.tron.log('PaymentId: ' + confirm.response.id + ', cart id ' + cartItems[0].chart_id)
    this.props.sendPaymentId(accessToken, confirm.response.id, cartItems[0].chart_id)
  }

  resetCart () {
    // checking duplication
    const { cartItems, historyItems } = this.props

    var newHistoryItems = Object.assign([], historyItems)
    var copyCartItems = Object.assign([], cartItems)
    for (let i = 0; i < copyCartItems.length; i++) {
      var isDuplicate = false
      for (let j = 0; j < historyItems.length; j++) {
        if (historyItems[j].product_id === copyCartItems[i].product_id) {
          isDuplicate = true
          break
        }
      }
      if (!isDuplicate) {
        newHistoryItems.push(copyCartItems[i])
      }
    }

    this.props.resetCart(newHistoryItems)
  }

  render () {
    const { navigation } = this.props
    var historyIcon = <View>
      <TouchableWithoutFeedback>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='list' color='white'
            onPress={() => navigation.navigate('TransactionHistoryScreen')}
         />
        </View>
      </TouchableWithoutFeedback>
    </View>

    return (

      <View style={styles.mainviewStyle}>
        <View style={styles.hasNavbar}>
          <BackHeader title='Cart' rightComponent={historyIcon} {...this.props} />
        </View>
        <View style={styles.cartContainer}>
          <ListCart {...this.props} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNumber}>Rp. {currency(this.totalCount())}</Text>
          <Button
            icon={{ name: 'shopping-cart' }}
            fontFamily='Verdana'
            backgroundColor='#2F1F37'
            style={{ width: 110, height: 50 }}
            onPress={() => this.payNow()}
            title={I18n.t('checkout')} />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
    rates: state.cart.rates,
    error: state.cart.error,
    historyItems: state.cart.histories,
    user: state.user.user,
    accessToken: state.user.accessToken
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeCartItem: (accessToken, item) => dispatch(CartActions.cartRemoveItemRequest(accessToken, item)),
    resetCart: (items) => dispatch(CartActions.cartReset(items)),
    getRate: () => dispatch(CartActions.cartGetCurrencyRequest()),
    addToHistory: (items) => dispatch(TransactionHistoryActions.addToHistory(items)),
    sendPaymentId: (accessToken, paymentId, cartId) => dispatch(CartActions.cartPaymentRequest(accessToken, paymentId, cartId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetailScreen)
