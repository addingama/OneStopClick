import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { Text, Rating, Button, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import BackHeader from '../Components/BackHeader'
import { currency } from '../Lib/numberFormatter.js'
import Carousel from 'react-native-looped-carousel'
import ImageViewer from 'ImageViewer'
import PayPal from 'react-native-paypal-wrapper'
import CartActions from '../Redux/CartRedux'

// Styles
import styles from './Styles/ProductDetailScreenStyle'

const defaultImage = 'http://onestopclick.tk/storage/default.png'
class ProductDetailScreen extends Component {
  constructor (props) {
    super(props)
    const { width } = Dimensions.get('window')
    this.state = {
      size: { width, height: 250 },
      showViewer: false,
      viewerIndex: 0
    }
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout
    this.setState({ size: { width: layout.width, height: 250 } })
  }

  generateImageSlider (product) {
    var images = []
    if (product.images.length === 0) {
      images.push({ id: 0, image_url: defaultImage })
    } else {
      images = product.images
    }
    return images
  }

  generateImageArray (product) {
    var images = []
    if (product.images.length === 0) {
      images.push(defaultImage)
    } else {
      product.images.forEach(function (item) {
        images.push(item.image_url)
      }, this)
    }
    return images
  }

  renderProductImage (image, index) {
    const { size } = this.state
    return (
      <TouchableWithoutFeedback key={image.id} onPress={() => this.openImageViewer(index)}>
        <Image source={{ uri: image.image_url }} resizeMode='contain' style={[styles.carouselBackground, size]} />
      </TouchableWithoutFeedback>
    )
  }

  openImageViewer (index) {
    this.setState({
      showViewer: true,
      viewerIndex: index
    })
  }

  closeViewer () {
    this.setState({
      showViewer: false,
      viewerIndex: 0
    })
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
  openCart (product) {
    const { navigation } = this.props
    if (this.addCartItem(product)) {
      navigation.navigate('CartDetailScreen')
    }
  }

  addCartItem (product) {
    const { cartItems } = this.props

    // checking duplication
    var found = false
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === product.id) {
        found = true
        break
      }
    }
    if (!found) {
      var newCartItems = Object.assign([], cartItems)
      newCartItems.push(product)
      this.props.addToCart(newCartItems)

      Alert.alert('Success', product.product_name + ' has been added to cart.')
      return true
    } else {
      Alert.alert('Alert', 'You have already bought ' + product.product_name + '.')
      return false
    }
  }

  render () {
    const { product } = this.props.navigation.state.params
    return (
      <View>
        <View style={styles.hasNavbar}>
          <BackHeader title={I18n.t('productDetail')} {...this.props} />
        </View>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
            <Carousel
              bullets={product.images.length > 1}
              bulletStyle={styles.bulletStyle}
              bulletsContainerStyle={styles.bulletsContainerStyle}
              style={this.state.size}>
              { this.generateImageSlider(product).map(this.renderProductImage.bind(this))}

            </Carousel>
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
                style={{ margin: 0, padding: 0 }}
                onPress={() => this.addCartItem(product)}
                title={I18n.t('addToCart')} />
              <Button title='Buy Now' onPress={() => this.openCart(product)} />
            </View>
          </View>
        </ScrollView>
        <ImageViewer shown={this.state.showViewer}
          imageUrls={this.generateImageArray(product)}
          onClose={this.closeViewer.bind(this)}
          index={this.state.viewerIndex} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (items) => dispatch(CartActions.cartItemAdded(items))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen)
