import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import BackHeader from '../Components/BackHeader'
import I18n from 'react-native-i18n'
// Styles
import styles from './Styles/TransactionHistoryScreenStyle'

class TransactionHistoryScreen extends Component {
  generateHistories () {
    const { historyItems } = this.props
    var products = []
    if (historyItems.data.length > 0) {
      for (var i = 0; i < historyItems.data.length; i++) {
        for (var j = 0; j < historyItems.data[i].details.length; j++) {
          console.tron.log(historyItems.data[i].id + '; product id ' + historyItems.data[i].details[j].product.id)
          products.push(historyItems.data[i].details[j].product)
        }
      }
    }
    return products
  }

  render () {
    return (
      <View style={styles.mainviewStyle}>
        <View style={styles.hasNavbar}>
          <BackHeader title='Transaction History' {...this.props} />
        </View>
        <FlatList style={styles.container}
          data={this.generateHistories()}
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
