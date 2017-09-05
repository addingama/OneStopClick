import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import ListCart from '../Components/ListCart.js'
import BackHeader from '../Components/BackHeader'
import CartActions from '../Redux/CartRedux'
import Reactotron from 'reactotron-react-native'
// Styles
import styles from './Styles/CartDetailScreenStyle'

class CartDetailScreen extends Component {
  processPayment () {

  }

  deleteCartItem (product) {
    const { cartItems } = this.props

    // checking
    var found = false
    var index = 0
    for(var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id == product.id) {
            found = true;
            index = i;
            Reactotron.log("Removed index " + i)
            break;
        }
    }
    if(found) {
      var newCartItems = Object.assign([], cartItems)
      newCartItems.splice(index, 1)
      this.props.removeCartItem(newCartItems)
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
const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartItem: (item) => dispatch(CartActions.cartItemRemoved(item))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartDetailScreen)
