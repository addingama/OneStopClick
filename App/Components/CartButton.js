import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './Styles/CartButtonStyle'

export default class CartButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      BadgeCount: 0
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      BadgeCount: newProps.BadgeCount
    })
  }

  renderBadge (hasBadge) {
    if (hasBadge) {
      return (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeCount}>
            {this.state.BadgeCount}
          </Text>
        </View>
      )
    }
  }

  render () {
    const { navigation } = this.props

    return (
      <View>
        <TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='shopping-cart' color='white'
              onPress={() => navigation.navigate('CartDetailScreen')}
            />
            { this.renderBadge(this.state.BadgeCount !== 0)}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
