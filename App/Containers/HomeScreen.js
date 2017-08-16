import React from 'react'
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
import { cloneDeep } from 'lodash'
var uuid = require('react-native-uuid')

class HomeScreen extends HomeDrawerBase {
  static navigationOptions = HomeDrawerBase.getNavigationOptions()
  static propTypes = {}

  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      selectedCategory: [],
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
    console.tron.log(categoriesData)
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
            onBuyPress={(item) => alert('Will redirect to detail')}
          />
        )
      }
    }
    return (categoriesLabel)
  }

  filterProduct (searchText, categoryName) {
    var categories = cloneDeep(this.props.products)
    var text = searchText.toLowerCase()

    var category = categories.filter((cat) => {
      return cat.name === categoryName
    })

    if (category.length !== 1) {
      return // do nothing because category not found
    }

    var filteredProducts = category[0].products.filter((product) => {
      return product.product_name.toLowerCase().includes(text)
    })

    category[0].products = filteredProducts
    console.tron.display({name: 'Filtered', value: {categories, category}})
    this.setState({
      listProducts: category
    })
  }

  render () {
    const { fetching, products } = this.props
    const { searchText, listProducts } = this.state

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
                  selectedValue={this.state.selectedCategory}
                  onValueChange={(itemValue) => this.setState({ selectedCategory: itemValue })}>
                  <Picker.Item label='Movies' value='Movies' id='3' />
                  <Picker.Item label='Applications' value='Applications' id='4' />
                  <Picker.Item label='Books' value='Books' id='5' />
                  <Picker.Item label='Musics' value='Musics' id='6' />
                </Picker>
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
