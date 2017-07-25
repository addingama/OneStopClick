import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import I18n from 'react-native-i18n'
import React, { Component } from 'react'
import { View } from 'react-native'

export class OscInputField extends Component {
  render () {
    const { name, secureText, message, returnKeyType, keyboardType } = this.props.field
    return <View>
      <FormLabel>{I18n.t(name)}</FormLabel>
      <FormInput
        ref={name}
        secureTextEntry={secureText}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        {...this.props}
      />
      <FormValidationMessage>{message}</FormValidationMessage>
    </View>
  }
}

export class OscButton extends React.Component {
  render () {
    const { title } = this.props
    return <Button
      title={title}
      backgroundColor='#86b200'
      fontWeight='bold'
    />
  }
}
