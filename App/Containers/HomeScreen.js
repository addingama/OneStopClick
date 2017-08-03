import React, { Component, PropTypes } from 'react'
import { Alert, ScrollView, Text, View, Image, Button, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DrawerNavigator } from 'react-navigation'
import { CustomInputField, CustomButton, HamburgerMenu } from '../Components/FormGenerator'
import { NavigationActions, } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressIndicator from '../Components/ProgressIndicator'
import * as RegistrationModel from '../Models/RegistrationModel'
import { Images } from '../Themes'
import I18n from 'react-native-i18n'
import { validateField } from '../Lib/validator'
import RegistrationActions from '../Redux/RegistrationRedux'
import { cloneDeep } from 'lodash'
import { List, ListItem, Header, SideMenu, Icon } from 'react-native-elements'
import styles from './Styles/HomeScreenStyle'
import * as MenuModel from '../Models/MenuModel'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    drawerIcon:({tintColor}) => {
      return (
        <MaterialIcons
            name='home'
            size={24}
            style={{color:tintColor}}
        >
        </MaterialIcons>
      )
    }
  }

  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  onSideMenuChange(isOpen: boolean) {
    this.setState({
      isOpen: isOpen
    })
  }

  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }


  handleLogout() {
    // Works on both iOS and Android
    Alert.alert(
      I18n.t('message'),
      I18n.t('logoutConfirmation'),
      [
        { text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed') },
        { text: I18n.t('ok'), onPress: () => this.logout() },
      ],
      { cancelable: false }
    )
  }

  logout() {
    // clear data here
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  test() {
    // navigation.navigate('DrawerOpen')
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    return (
      <Header
        backgroundColor='#86b200'
        leftComponent={<HamburgerMenu onPress={this.test.bind(this)} />}
        centerComponent={{ text: 'Home', style: { color: '#fff' } }}
      />
    )
    /*var list = MenuModel.menuList
    const MenuComponent = (
      <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50 }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            list.map((l, i) => (
              <ListItem
                onPress={() => this.handleLogout()}
                leftIcon={{ name: l.icon }}
                key={i}
                title={l.title}
              />
            ))
          }
        </List>
      </View>
    )

    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={this.onSideMenuChange.bind(this)}
        menu={MenuComponent}>
        <View style={styles.container}>
          <Header
            backgroundColor='#86b200'
            leftComponent={<HamburgerMenu onPress={this.toggleSideMenu.bind(this)} />}
            centerComponent={{ text: 'Home', style: { color: '#fff' } }}
          />
        </View>
      </SideMenu>
    )*/
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


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
