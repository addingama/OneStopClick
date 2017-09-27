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
    const { historyItems } = this.props

    return (
      <View style={styles.mainviewStyle}>
        <View style={styles.hasNavbar}>
          <BackHeader title='Transaction History' {...this.props} />
        </View>
        <FlatList style={styles.container}
          data={historyItems}
          keyExtractor={(item, index) => item.id}
          numColumns='1'
          renderItem={
              ({ item }) =>
              /* Adding touch event to activated scrolling
                      <Image
                        style={styles.image}
                        source={{ uri: item.images[0].image_url }} />
              */
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
                          <View>
                            <Text style={styles.download}>{I18n.t('download')}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.separator} />
                  </View>
                </TouchableWithoutFeedback>
            }
         />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
    historyItems: state.cart.histories
  }
}

export default connect(mapStateToProps)(TransactionHistoryScreen)
