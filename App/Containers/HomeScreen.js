import React, { Component, PropTypes } from 'react'
import { Alert, ScrollView, Text, View, Image, Button, TouchableOpacity, TouchableHighlight, StyleSheet, Picker, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { DrawerNavigator } from 'react-navigation'
import { CustomInputField, CustomButton, HamburgerMenu } from '../Components/FormGenerator'
import { NavigationActions, } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProgressIndicator from '../Components/ProgressIndicator'
import * as RegistrationModel from '../Models/RegistrationModel'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import { validateField } from '../Lib/validator'
import ProductActions from '../Redux/ProductRedux'
import { cloneDeep } from 'lodash'
import { Header, Icon, Card, ListItem, SearchBar, Grid, Col } from 'react-native-elements'
import styles from './Styles/HomeScreenStyle'
import HomeDrawerBase from './Bases/HomeDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'

class HomeScreen extends HomeDrawerBase {
  static navigationOptions = HomeDrawerBase.getNavigationOptions()
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  openMenu() {
    this.props.navigation.navigate('DrawerOpen')
  }

  componentWillMount() {
    this.props.getProducts()
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate()
  }

  generateCategories(categories) {
    var categoriesLabel = [];
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        categoriesLabel.push(<Text style={[styles.titleLabel]}>{categories[i].name}</Text>)
        categoriesLabel.push(this.generateProducts(categories[i].products))
      }
    }
    return (categoriesLabel)
  }

  generateProducts(products) {
    return (<FlatList
      data={products}
      numColumns='2'
      renderItem={({ item }) =>
        <Grid>
          <Col>
            <Card
              title={item.product_name}
              image={{ uri: item.images[0].image_url }}
            >
              <Text style={{ marginBottom: 10 }}>
                {item.description}
              </Text>
              <Text numberOfLines={2} ellipsizeMode={'tail'} style={{ marginBottom: 10, color:'green' }}>
                {item.price}
              </Text>
              <Button
                icon={{ name: 'code' }}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='BUY NOW' />
            </Card>
          </Col>
        </Grid>
      }
    />)
  }


  render() {
    const { fetching, error, products } = this.props
    return (
      <View>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('home')} {...this.props} />
        </View>
        <ScrollView contentContainerStyle={[styles.scrollCenterContainer]}>
          <View style={styles.customContainer}>
            <View style={[styles.formContainer]}>
              <View style={[styles.contentContainer]}>
                <Text style={[styles.titleLabel]}>Search</Text>
                <Picker
                  selectedValue={'aa'}
                  onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                  <Picker.Item label="Movie" value="movie" />
                  <Picker.Item label="Music" value="music" />
                </Picker>
                <SearchBar
                  lightTheme
                  onChangeText={() => alert()}
                  placeholder='Type Here...' />
              </View>
              <View style={[styles.contentContainer]}>
                {
                  this.generateCategories(products)
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
