import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import I18n from 'react-native-i18n'
import React, { Component } from 'react'
import { View, Item, Label, Input } from 'react-native'

export class OscInputField extends React.Component {
  render() {
    
    const { name, secureText, message, returnKeyType, keyboardType, nextInput } = this.props.field
    return <View>
      <FormLabel>{I18n.t(name)}</FormLabel>
      <FormInput
        ref = {name} 
        secureTextEntry={secureText} 
        returnKeyType={returnKeyType} 
        keyboardType={keyboardType} 
        onChangeText={(text) => this.props.onChangeText(text)} 
        onSubmitEditing={(event) => this.props.onSubmitEditing(event)}  
      />
      <FormValidationMessage>{message}</FormValidationMessage>
    </View>
  }
}

export class OscButton extends React.Component {
  render() {
    const { title } = this.props
    return <Button
      title={title}
      backgroundColor="#86b200"
      fontWeight='bold'
    />
  }
}





