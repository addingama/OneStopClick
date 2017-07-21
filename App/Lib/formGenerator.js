import { View, Item, Label, Input } from 'react-native'
import I18n from 'react-native-i18n'

export function renderInputField (field) {
  return <View>
    <Item floatingLabel>
        <Label>{I18n.t(field.name)}</Label>
        <Input
          onChangeText={(text) => this.onChangeField(text, field.name)}
          id={field.name}
          name={field.name}
          secureTextEntry={field.secureText}
        />
      </Item>
      {this.renderErrors(field)}
    </View>
  }
