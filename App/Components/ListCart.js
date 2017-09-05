import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight, FlatList, ScrollView } from 'react-native'
import Reactotron from 'reactotron-react-native'
import styles from './Styles/ListCartStyle'
var uuid = require('react-native-uuid')

class ListCart extends Component {
  deleteItem () {

  }
  render () {
    const { cartItems } = this.props
    Reactotron.log('cart items count ' + cartItems.lenght)
    return (
      <FlatList style={styles.container}
        data={cartItems}
        key={uuid.v1()}
        numColumns='1'
        renderItem={({ item }) =>
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
                    {item.price}
                  </Text>
                </View>
              </View>
              <View style={styles.deleteContainer}>
                <TouchableHighlight onPress={() => {
                  this.deleteItem()
                }}>
                  <Text style={styles.delete}>X</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        }
      />
    )
  }
}

export default ListCart
