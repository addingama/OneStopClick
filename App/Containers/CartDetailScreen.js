import React, { Component, PropTypes } from 'react'
import { ScrollView, View, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
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
       Reactotron.log("Cart Detail Screen " + this.props.cart.items.lenght)
       const { cart } = this.props
        return (
            <View>
                <View style={styles.hasNavbar}>
                    <BackHeader title="Cart" {...this.props} />
                </View>
                <List {...this.props}/>      
            </View>  
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {    
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(CartDetailScreen)
