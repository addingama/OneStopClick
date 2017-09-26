import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight, FlatList, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/ListCartStyle'
import { currency } from '../Lib/numberFormatter.js'
var uuid = require('react-native-uuid')

class ListCart extends Component {
  render () {
    const { cartItems, accessToken } = this.props

    return (
      <FlatList style={styles.container}
        data={cartItems}
        key={cartItems.id}
        numColumns='1'
        renderItem={({ item }) =>
        /* Adding touch event to activated scrolling
        <Image
                  style={styles.image}
                  source={{ uri: item.product.images[0].image_url }}
            /> */
          <TouchableWithoutFeedback>
            <View>
              <View style={styles.rowContainer}>

                <View style={styles.textContainer}>
                  <View>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      style={styles.productTitle}>
                      {item.product.product_name}
                    </Text>
                  </View>
                  <View>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      style={styles.productDesc}>
                      {item.product.description}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={styles.productPrice}>
                    Rp. { currency(item.product.price) }
                    </Text>
                  </View>
                </View>
                <View style={styles.deleteContainer}>
                  <TouchableHighlight onPress={() => {
                    this.props.removeCartItem(accessToken, item)
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
