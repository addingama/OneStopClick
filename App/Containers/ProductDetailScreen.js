import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {cloneDeep} from 'lodash'
import I18n from 'react-native-i18n'
import ImageSlider from 'react-native-image-slider-agb'
import BackHeader from '../Components/BackHeader'

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

  render () {
    const { product } = this.props.navigation.state.params
    return (
      <View>
        <View style={styles.hasNavbar}>
          <BackHeader title={I18n.t('productDetail')} {...this.props} />
        </View>
        <ImageSlider images={this.generateImageSlider(product)} height={200} />
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
