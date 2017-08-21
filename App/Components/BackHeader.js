import React, { Component, PropTypes } from 'react'
import { Header, Icon } from 'react-native-elements'
import styles from './Styles/DrawerHeaderStyle'

export default class BackHeader extends Component {
  render () {
    const { title, navigation, backAction } = this.props
    console.tron.log(this.props)
    return (
      <Header
        backgroundColor='#2F1F37'
        leftComponent={<Icon
          name='ios-arrow-back'
          type='ionicon'
          color='white'
          onPress={() => (typeof backAction === 'undefined' || backAction === null) ? navigation.goBack() : backAction()} />}
        centerComponent={{ text: title, style: styles.titleStyle }}
      />
    )
  }
}

BackHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}
