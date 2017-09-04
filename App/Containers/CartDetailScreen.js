import React, { Component, PropTypes } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import List from '../Components/ListCart.js'
import BackHeader from '../Components/BackHeader'
// Styles
import styles from './Styles/CartDetailScreenStyle'

import Reactotron from 'reactotron-react-native'

class CartDetailScreen extends Component {
    constructor (props) {
        super(props)
        
    }
    render () {
       Reactotron.log("Cart Detail Screen " + this.props.navigation.state.routeName)
       Reactotron.log("Cart Detail Screen " + this.props.cartItems.length)
       const { cartItems } = this.props
        return (
            <View >
                <View style={styles.hasNavbar}>
                    <BackHeader title="Cart" {...this.props} />
                </View>
                <ScrollView>
                    <List {...this.props}/> 
                </ScrollView>  
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
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(CartDetailScreen)
