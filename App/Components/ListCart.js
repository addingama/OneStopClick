import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import Reactotron from 'reactotron-react-native'

class List extends Component {

   render() {
    const { items } = this.props.cart
    Reactotron.log("cart items count " + items.lenght)
      return (
         <View>
            {
              items.map((item, index) => (
                 
                  <Text style={styles.text}>
                  {item.name}
                  </Text>

               ))
            }
         </View>
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
