import React, { Component, PropTypes } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import I18n from 'react-native-i18n'
import HideableView from 'react-native-hideable-view'
import styles from './Styles/ProgressIndicatorStyle'

export default class ProgressIndicator extends Component {
  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }
  
  // Defaults for props
  static defaultProps = {
    show: false,
    text: I18n.t('loading')
  }

  render () {
    const { show, text } = this.props
    return (
      <HideableView style={styles.messageBox} visible={show}>
        <ActivityIndicator size='large' color={'#ffffff'}/>
        <Text style={styles.messageText}>{text}</Text>
      </HideableView>
    )
  }
}
