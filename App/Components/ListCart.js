import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import Reactotron from 'reactotron-react-native'
var uuid = require('react-native-uuid')
class List extends Component {

   render() {
    const { cartItems } = this.props
    Reactotron.log("cart items count " + cartItems.lenght)
      return (<FlatList
        data={cartItems}
        key={uuid.v1()}
        numColumns='1'
        renderItem={({ item }) =>
        <View>
          <Card
            style={styles.cardContent}
            key={item.id}
            title={item.product_name}
            image={{ uri: item.images[0].image_url }}
          >
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={{ marginBottom: 10 }}>
              {item.description}
            </Text>
            <Text
              style={{ marginBottom: 10, color: 'green', textAlign: 'right' }}>
              {item.price}
            </Text>
          </Card>
      </View>
        }
      />
      )
   }
}

export default List

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})
