import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import ProductDetailScreen from '../Containers/ProductDetailScreen'
import EditProfileScreen from '../Containers/EditProfileScreen'
import AccountScreen from '../Containers/AccountScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import HomeScreen from '../Containers/HomeScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import LoginScreen from '../Containers/LoginScreen'
import CartDetailScreen from '../Containers/CartDetailScreen'
import TransactionHistoryScreen from '../Containers/TransactionHistoryScreen'
import styles from './Styles/NavigationStyles'

const AccountStack = StackNavigator({
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  AccountScreen: { screen: AccountScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LoginScreen: { screen: LoginScreen },
  EditProfileScreen: { screen: EditProfileScreen }
}, {
  stateName: 'AccountStack',
  headerMode: 'none',
  initialRouteName: 'AccountScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const ParentDrawerLabel = ({ label }) => (
  <View style={styles.parentViewDrawerLabel}>
    <View>
      <Text style={styles.parentDrawerLabel}>{label}</Text>
    </View>
  </View>
)

const ChildDrawerLabel = ({ label }) => (
  <View style={styles.viewDrawerLabel}>
    <View style={{ flex: 1, marginLeft: 20 }}>
      <Text style={styles.childDrawerLabel}>{label}</Text>
    </View>
  </View>
)

const ProductStack = StackNavigator({
  Home: { screen: HomeScreen },
  ProductDetailScreen: { screen: ProductDetailScreen },
  CartDetailScreen: { screen: CartDetailScreen },
  TransactionHistoryScreen: { screen: TransactionHistoryScreen }

}, {
  stateName: 'ProductStack',
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimaryNav = DrawerNavigator(
  {
    Home: {
      screen: ProductStack
    },
    Account: {
      screen: AccountStack
    },
    Categories: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        // override homescreen navigationOptions
        drawerIcon: ({ tintColor }) => {
        },
        drawerLabel: (
          <ParentDrawerLabel
            label='Categories'
          />
        )
      })
    },
    Movies: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        // override homescreen navigationOptions
        drawerIcon: ({ tintColor }) => {
        },
        drawerLabel: (
          <ChildDrawerLabel
            label='Movies'
          />
        )
      })
    },
    Applications: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        // override homescreen navigationOptions
        drawerIcon: ({ tintColor }) => {
        },
        drawerLabel: (
          <ChildDrawerLabel
            label='Applications'
          />
        )
      })
    },
    Books: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        // override homescreen navigationOptions
        drawerIcon: ({ tintColor }) => {
        },
        drawerLabel: (
          <ChildDrawerLabel
            label='Books'
            />
        )
      })
    },
    Musics: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        // override homescreen navigationOptions
        drawerIcon: ({ tintColor }) => {
        },
        drawerLabel: (
          <ChildDrawerLabel
            label='Musics'
            />
        )
      })
    }
  },
  {
    stateName: 'PrimaryNav',
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
)

export default PrimaryNav
