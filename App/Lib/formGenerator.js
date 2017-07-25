import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import I18n from 'react-native-i18n'
import React, { Component } from 'react'
import { View } from 'react-native'
import { validateField } from '../Lib/validator'

export class OscInputField extends Component {
  setValue (fieldName, newValue, existingState) {
    existingState[fieldName].value = newValue
    return existingState
  }

  render () {
    var field = this.props.field
    const { name, secureText, message, returnKeyType, keyboardType, value } = field
    var state = this.props.state
    return <View>
      <FormLabel>{I18n.t(name)}</FormLabel>
      <FormInput
        ref={name}
        value={value}
        secureTextEntry={secureText}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onChangeText={(text) => this.props.updateState(this.setValue(name, text, state))}
        onSubmitEditing={(event) => this.props.updateState(validateField(state, name))}
        onBlur={(event) => this.props.updateState(validateField(state, name))}
        {...this.props}
      />
      <FormValidationMessage>{message}</FormValidationMessage>
    </View>
  }
}

export class OscButton extends React.Component {
  render () {
    return <Button
      {...this.props}
      backgroundColor='#86b200'
      fontWeight='bold'
    />
  }
}
