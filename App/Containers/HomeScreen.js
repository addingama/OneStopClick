import React, { Component, PropTypes } from 'react'
import { ScrollView, Text, View, Picker } from 'react-native'
import { connect } from 'react-redux'
import { Category, Products } from '../Components/FormGenerator'
import ProgressIndicator from '../Components/ProgressIndicator'
import I18n from 'react-native-i18n'
import ProductActions from '../Redux/ProductRedux'
import { SearchBar } from 'react-native-elements'
import styles from './Styles/HomeScreenStyle'
import HomeDrawerBase from './Bases/HomeDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'
var uuid = require('react-native-uuid')

class HomeScreen extends HomeDrawerBase {
  static navigationOptions = HomeDrawerBase.getNavigationOptions()
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getProducts()
  }

  generateListProducts(categoriesData) {
    var categoriesLabel = [];
    var categories = categoriesData

    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        categoriesLabel.push(
          <Category
            key={i}
            category={categories[i]}
          />
        )
        categoriesLabel.push(
          <Products
            key = {uuid.v1()}
            data = {categories[i].products}
            onBuyPress = {(item) => alert("Will redirect to detail")}
          />
        )
      }
    }
    return (categoriesLabel)
  }

  render() {
    var { fetching, error, products } = this.props
    return (
      <View>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('home')} {...this.props} />
        </View>
        <ScrollView contentContainerStyle={[styles.scrollCenterContainer]}>
          <View style={styles.customContainer}>
            <View style={[styles.formContainer]}>
              <View style={[styles.contentContainer]}>
                <Text style={[styles.titleLabel]}>{I18n.t('search')}</Text>
                <Picker
                  selectedValue={'movie'}
                  onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                  <Picker.Item label="Movie" value="movie" />
                  <Picker.Item label="Music" value="music" />
                </Picker>
                <SearchBar
                  lightTheme
                  onChangeText={() => console.log()}
                  placeholder={I18n.t('searchHere')} />
              </View>
              <View style={[styles.contentContainer]}>
                {
                  this.generateListProducts(products)
                }
              </View>
            </View>
            <ProgressIndicator show={fetching} text={I18n.t('fetching')} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.product.fetching,
    error: state.product.error,
    message: state.product.message,
    products: state.product.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(ProductActions.getProductsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
