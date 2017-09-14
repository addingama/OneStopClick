import React, { Component, PropTypes } from 'react'
import { Header } from 'react-native-elements'
import { HamburgerMenu } from './FormGenerator'
import styles from './Styles/DrawerHeaderStyle'

export default class DrawerHeader extends Component {
  openMenu () {
    this.props.navigation.navigate('DrawerOpen')
  }

  render () {
    const { title, rightComponent } = this.props
    return (
      <Header
        backgroundColor='#2F1F37'
        leftComponent={<HamburgerMenu onPress={this.openMenu.bind(this)} />}
        centerComponent={{ text: title, style: styles.titleStyle }}
        rightComponent={rightComponent}
      />
    )
  }
}

DrawerHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}
