import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import ListCart from '../Components/ListCart.js'
import BackHeader from '../Components/BackHeader'
import CartActions from '../Redux/CartRedux'
import PayPal from 'react-native-paypal-wrapper'
import I18n from 'react-native-i18n'
import { currency } from '../Lib/numberFormatter.js'
// Styles
import styles from './Styles/CartDetailScreenStyle'

class CartDetailScreen extends Component {

  componentWillMount () {
    this.props.getRate()
  }

  payNow () {
    if (this.totalCount() > 0) {
      var total = this.covertToUsd()
      if (total === 0 ) {
        alert('Failed to convert currency.')
      } else {
        // PayPal.initialize(PayPal.PRODUCTION, 'AYshIbtN2_ZHCg3wz1jV6a9Bc62bfqWK3h1YbCDAsGxbnYIwjL5hJIAlWdEMrRcq9rJ5pzw6slOge9PH')
        PayPal.initialize(PayPal.SANDBOX, 'AWJl6EO2yfm9T9t0OPWRM0WF4V3xJe4zg8P6dLXJs1dpR2jl96WD08gRjo3buNH5QmHzC04ffJPkZycL')
        PayPal.pay({
          price: total.toString(),
          currency: 'USD',
          description: 'One Stop Click Payment'
        }).then(confirm => this.transactionHistory(confirm))
        .catch(error => console.tron.log(error))
      }
    } else {
      alert('Your cart has 0 item')
    } 
  }

  covertToUsd(){
    const { rates } = this.props
    if(rates.IDR === 0 || rates === null ){
      return 0
    } else {

    var usdTotal = this.totalCount() / parseFloat(rates.IDR)
    return usdTotal
    }
  }

  totalCount () {
    const { cartItems } = this.props
    var totalPayment = 0
    for (var i = 0; i < cartItems.length; i++) {
      var price = parseFloat(cartItems[i].price)
      totalPayment = totalPayment + price
    }
    return totalPayment
  }

  transactionHistory (confirm) {
    console.tron.log(confirm)
    console.tron.log('success')

    // clear cart
    this.resetCart()

    // go to transaction history
  }

  resetCart () {
    var items = []
    this.props.resetCart(items)
  }
  render () {
    return (
      <View style={styles.mainviewStyle}>
        <View style={styles.hasNavbar}>
          <BackHeader title='Cart' {...this.props} />
        </View>
        <ListCart {...this.props} />
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNumber}>Rp. {currency(this.totalCount())}</Text>
          <Button
            icon={{ name: 'shopping-cart' }}
            fontFamily='Verdana'
            backgroundColor='#2F1F37'
            style={{ width: 100, height: 50 }}
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
    error: state.cart.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeCartItem: (item) => dispatch(CartActions.cartItemRemoved(item)),
    resetCart: (items) => dispatch(CartActions.cartReset(items)),
    getRate: () => dispatch(CartActions.cartGetCurrency())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetailScreen)
