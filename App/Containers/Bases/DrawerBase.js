import React, { Component } from 'react'
import { View } from 'react-native'
import { Header } from 'react-native-elements'
import { HamburgerMenu } from '../../Components/FormGenerator'

class DrawerBase extends Component {
  openMenu () {
    this.props.navigation.navigate('DrawerOpen')
  }

  generateNavbar (title) {
    return (
      <View>
        <Header
          backgroundColor='#2F1F37'
          leftComponent={<HamburgerMenu onPress={this.openMenu.bind(this)} />}
          centerComponent={{ text: title, style: { color: '#fff' } }}
        />
      </View>
    )
  }
}

export default DrawerBase
