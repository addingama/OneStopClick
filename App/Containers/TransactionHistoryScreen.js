import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import BackHeader from '../Components/BackHeader'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/TransactionHistoryScreenStyle'
var uuid = require('react-native-uuid')

class TransactionHistoryScreen extends Component {
  render () {
    const { cartItems } = this.props
    return (
      <View style={styles.mainviewStyle}>
        <View style={styles.hasNavbar}>
          <BackHeader title='Transaction History' {...this.props} />
        </View>
        <FlatList style={styles.container}
          data={cartItems}
          key={uuid.v1()}
          numColumns='1'
          renderItem={
              ({ item }) =>
                <View>
                  <View style={styles.rowContainer}>
                    <Image
                      style={styles.image}
                      source={{ uri: item.images[0].image_url }} />
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
                        <TouchableWithoutFeedback>
                          <View>
                            <Text style={styles.download}>{I18n.t('download')}</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </View>
                  <View style={styles.separator} />
                </View>
            }
         />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
    historyItems: state.transactionHistory
  }
}

export default connect(mapStateToProps)(TransactionHistoryScreen)
