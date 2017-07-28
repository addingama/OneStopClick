import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements'
import I18n from 'react-native-i18n'
import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { validateField } from '../Lib/validator'

export class CustomInputField extends Component {
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
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => this.props.updateState(this.setValue(name, text, state))}
        onSubmitEditing={(event) => this.props.updateState(validateField(state, name))}
        onBlur={(event) => this.props.updateState(validateField(state, name))}
        {...this.props}
      />
      <FormValidationMessage>{message}</FormValidationMessage>
    </View>
  }
}

export class CustomButton extends React.Component {
  render () {
    return <Button
      {...this.props}
      backgroundColor='#86b200'
      fontWeight='bold'
    />
  }
}

export class HamburgerMenu extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={{ marginTop: 7, marginLeft: 9 }}
        {...this.props}
        underlayColor='transparent'>
        <Icon
          color='white'
          name='menu'
          size={28}
        />
      </TouchableOpacity>
    )
  }
}
