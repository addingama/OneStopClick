import React from 'react'
import { ScrollView, Text, View, Modal, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Category, Products } from '../Components/FormGenerator'
import ProgressIndicator from '../Components/ProgressIndicator'
import I18n from 'react-native-i18n'
import ProductActions from '../Redux/ProductRedux'
import { SearchBar, Icon } from 'react-native-elements'
import styles from './Styles/HomeScreenStyle'
import HomeDrawerBase from './Bases/HomeDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'
import CategoryChooser from '../Components/CategoryChooser'
import BackHeader from '../Components/BackHeader'
import CartButton from '../Components/CartButton'
import { cloneDeep } from 'lodash'
var uuid = require('react-native-uuid')

class HomeScreen extends HomeDrawerBase {
  static navigationOptions = HomeDrawerBase.getNavigationOptions()
  static propTypes = {}

  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      searchText: '',
      selectedCategory: 'All Categories',
      listProducts: []
    }
  }

  componentWillMount () {
    this.props.getProducts()
  }

  handleSearch (text) {
    this.setState({searchText: text})
    this.filterProduct(text, this.state.selectedCategory)
  }

  generateListProducts (categoriesData) {
    var categoriesLabel = []
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
            key={uuid.v1()}
            data={categories[i].products}
            onBuyPress={() => alert('add to cart')}
            onProductClick={(item) => this.openProductDetail(item)}
          />
        )
      }
    }
    return (categoriesLabel)
  }

  openProductDetail (product) {
    this.props.navigation.navigate('ProductDetailScreen', { product: product })
  }

  filterProduct (searchText, categoryName) {
    var categories = cloneDeep(this.props.products)
    var text = searchText.toLowerCase()

    var category = categories.filter((cat) => {
      return cat.name === categoryName
    })

    var filteredProducts = []
    if (category.length === 0) { // all categories
      var temps = []
      for (var index = 0; index < categories.length; index++) {
        var categoryDetail = categories[index]
        filteredProducts = categoryDetail.products.filter((product) => {
          return product.product_name.toLowerCase().includes(text)
        })
        categoryDetail.products = filteredProducts
        temps[index] = categoryDetail
      }

      // remove category that have 0 product
      category = temps.filter((cat) => {
        return cat.products.length > 0
      })
    } else {
      filteredProducts = category[0].products.filter((product) => {
        return product.product_name.toLowerCase().includes(text)
      })

      category[0].products = filteredProducts
    }

    this.setState({
      listProducts: category
    })
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  generateCategoryArray () {
    var categories = [{
      id: 0,
      name: 'All Categories'
    }]
    const { products } = this.props
    if (products == null) {
      return categories
    }
    this.props.products.forEach(function (item) {
      categories.push({id: item.id, name: item.name})
    }, this)
    return categories
  }

  render () {
    const { fetching, products } = this.props
    const { searchText, listProducts, selectedCategory } = this.state

    return (
      <View>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('home')} rightComponent={<CartButton />} {...this.props} />
        </View>
        <ScrollView contentContainerStyle={[styles.defaultMarginTop]}>
          <View style={styles.customContainer}>
            <View style={styles.formContainer}>
              <View style={[styles.contentContainer]}>
                <Text style={[styles.titleLabel]}>{I18n.t('search')}</Text>
                <TouchableHighlight onPress={() => {
                  this.setModalVisible(true)
                }}>
                  <View style={styles.categorySpinner}>
                    <Text>{selectedCategory}</Text>
                    <Icon name='keyboard-arrow-down' />
                  </View>
                </TouchableHighlight>
                <SearchBar
                  lightTheme
                  onChangeText={(text) => this.handleSearch(text)}
                  placeholder={I18n.t('searchHere')} />
              </View>
              <View style={[styles.contentContainer]}>
                {
                  this.generateListProducts(searchText === '' ? products : listProducts)
                }
              </View>
            </View>
            <ProgressIndicator show={fetching} text={I18n.t('fetching')} />
          </View>
        </ScrollView>

        <Modal animationType={'slide'} transparent={false} visible={this.state.modalVisible} >
          <View>
            <View style={styles.hasNavbar}>
              <BackHeader title='Select Category' {...this.props}
                backAction={() => this.setModalVisible(!this.state.modalVisible)} />
            </View>
            <CategoryChooser selectedValue={this.state.selectedCategory}
              onValueChange={(itemValue) => this.setState({ selectedCategory: itemValue })}
              items={this.generateCategoryArray()} />
          </View>
        </Modal>
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
