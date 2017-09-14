import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight, FlatList, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/ListCartStyle'
import { currency } from '../Lib/numberFormatter.js'
var uuid = require('react-native-uuid')

class ListCart extends Component {
  deleteCartItem (product) {
    const { cartItems } = this.props

    // checking
    var found = false
    var index = 0
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === product.id) {
        found = true
        index = i
        break
      }
    }
    if (found) {
      var newCartItems = Object.assign([], cartItems)
      newCartItems.splice(index, 1)
      this.props.removeCartItem(newCartItems)
    }
  }

  render () {
    const { cartItems } = this.props
    return (
      <FlatList style={styles.container}
        data={cartItems}
        key={uuid.v1()}
        numColumns='1'
        renderItem={({ item }) =>
        /* Adding touch event to activated scrolling */
          <TouchableWithoutFeedback>
            <View>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: item.images[0].image_url }}
            />
                <View style={styles.textContainer}>
                  <View>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      style={styles.productTitle}>
                      {item.product_name}
                    </Text>
                  </View>
                  <View>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      style={styles.productDesc}>
                      {item.description}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={styles.productPrice}>
                    Rp. { currency(item.price) }
                    </Text>
                  </View>
                </View>
                <View style={styles.deleteContainer}>
                  <TouchableHighlight onPress={() => {
                    this.deleteCartItem(item)
                  }}>
                    <Text style={styles.delete}>X</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableWithoutFeedback>
        }
      />
    )
  }
}

export default ListCart
