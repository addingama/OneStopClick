import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Icon, Badge } from 'react-native-elements'
import HideableView from 'react-native-hideable-view'
import styles from './Styles/CartButtonStyle'

export default class CartButton extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { itemCount } = this.props
    return (
      <View style={styles.container}>
        <Icon
          onPress={() => alert('open cart page')}
          name='shopping-cart'
          color='white' />
        <HideableView visible={typeof (itemCount) !== 'undefined' && itemCount > 0}>
          <Badge
            containerStyle={{ marginLeft: -10, marginTop: 15, backgroundColor: 'red' }}
            value={itemCount}
            textStyle={{ color: 'white' }} />
        </HideableView>

      </View>
    )
  }
}
