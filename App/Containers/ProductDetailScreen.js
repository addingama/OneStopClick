import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Text, Rating, Button, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import {cloneDeep} from 'lodash'
import I18n from 'react-native-i18n'
import ImageSlider from 'react-native-image-slider-agb'
import BackHeader from '../Components/BackHeader'
import { currency } from '../Lib/numberFormatter.js'

// Styles
import styles from './Styles/ProductDetailScreenStyle'

class ProductDetailScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  generateImageSlider (product) {
    var images = []
    if (product.images.length === 0) {
      images.push('http://ccwc.org/wp-content/themes/ccwc-theme/images/no-image-available.png')
    } else {
      product.images.forEach(function (item) {
        images.push(item.image_url)
      }, this)
    }
    return images
  }

  countRating (product) {
    var rating = 0
    var length = product.reviews.length
    if (length > 0) {
      product.reviews.forEach((item) => {
        rating += item.rating
      })
      rating = rating / length
    }

    return rating
  }

  render () {
    const { product } = this.props.navigation.state.params
    return (
      <View>
        <View style={styles.hasNavbar}>
          <BackHeader title={I18n.t('productDetail')} {...this.props} />
        </View>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View>
            <ImageSlider images={this.generateImageSlider(product)} height={200} />
            <View style={{padding: 5}}>
              <Text numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{ fontSize: 18 }}>{product.product_name}</Text>
              <Divider style={styles.dividerMargin} />
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text>Rp.{ currency(product.price) }</Text>
                </View>
                <TouchableOpacity onPress={() => alert('go to review page')}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Rating readOnly startingValue={this.countRating(product)} imageSize={14} />
                    <Text style={{ marginLeft: 5, fontSize: 12 }}>{product.reviews.length} Review(s)</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Divider style={styles.dividerMargin} />
              <Text>
                {product.description}
              </Text>
              <Divider style={styles.dividerMargin} />
              <Button
                icon={{ name: 'shopping-cart' }}
                backgroundColor='green'
                fontFamily='Lato'
                style={{ margin:0, padding: 0 }}
                onPress={() => alert('add to cart')}
                title={I18n.t('addToCart')} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen)
