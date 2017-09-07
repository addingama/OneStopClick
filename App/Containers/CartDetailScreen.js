import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import ListCart from '../Components/ListCart.js'
import BackHeader from '../Components/BackHeader'
import CartActions from '../Redux/CartRedux'
import PayPal from 'react-native-paypal-wrapper'
// Styles
import styles from './Styles/CartDetailScreenStyle'

class CartDetailScreen extends Component {
  payNow () {
    // PayPal.initialize(PayPal.PRODUCTION, 'AYshIbtN2_ZHCg3wz1jV6a9Bc62bfqWK3h1YbCDAsGxbnYIwjL5hJIAlWdEMrRcq9rJ5pzw6slOge9PH')
    PayPal.initialize(PayPal.SANDBOX, 'AWJl6EO2yfm9T9t0OPWRM0WF4V3xJe4zg8P6dLXJs1dpR2jl96WD08gRjo3buNH5QmHzC04ffJPkZycL')
    console.tron.log(PayPal)
    PayPal.pay({
      price: this.totalCount().toString(),
      currency: 'IDR',
      description: 'One Stop Click Payment'
    }).then(confirm => console.tron.log(confirm))
      .catch(error => console.tron.log(error))
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
  render () {
    return (
      <View style={styles.mainviewStyle}>
        <View style={styles.hasNavbar}>
          <BackHeader title='Cart' {...this.props} />
        </View>
        <ListCart {...this.props} />
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNumber}>{this.totalCount()}</Text>
          <TouchableHighlight onPress={() => {
            this.payNow()
          }}>
            <Text style={styles.checkout}>Checkout</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeCartItem: (item) => dispatch(CartActions.cartItemRemoved(item))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetailScreen)
