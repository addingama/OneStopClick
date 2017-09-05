import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import ListCart from '../Components/ListCart.js'
import BackHeader from '../Components/BackHeader'
// Styles
import styles from './Styles/CartDetailScreenStyle'

class CartDetailScreen extends Component {
  processPayment () {

  }

  totalCount () {
    const { cartItems } = this.props
    var totalPayment = 0
    for (var i = 0; i < cartItems; i++) {
      totalPayment = totalPayment + cartItems[i].price
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
            this.processPayment()
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

export default connect(mapStateToProps)(CartDetailScreen)
