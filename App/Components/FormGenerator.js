import { FormLabel, FormInput, FormValidationMessage, Card, Button, Icon, Button as RneButton } from 'react-native-elements'
import I18n from 'react-native-i18n'
import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TouchableHighlight, FlatList } from 'react-native'
import { validateField } from '../Lib/validator'
import styles from './Styles/FormGeneratorStyle'
var uuid = require('react-native-uuid')

export class CustomInputField extends Component {
  setValue (fieldName, newValue, existingState) {
    existingState[fieldName].value = newValue
    return existingState
  };

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

export class Category extends Component {
  render () {
    const { name } = this.props.category
    return (<Text style={[styles.titleLabel]}>{name}</Text>)
  }
}

export class Products extends Component {
  render () {
    const { data } = this.props
    console.log(data)
    var products = Object.assign([], data)
    for (let j = 0; j < products.length; j++) {
      var product = Object.assign({}, products[j])
      product.key = product.id
      products[j] = product
    }
    return (<FlatList
      data={products}
      key={uuid.v1()}
      numColumns='2'
      renderItem={({ item }) =>
        <TouchableHighlight onPress={() => alert('will redirect to detail')}>
          <View>
            <Card
              style={styles.cardContent}
              key={item.id}
              title={item.product_name}
              image={{ uri: item.images[0].image_url }}
            >
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{ marginBottom: 10 }}>
                {item.description}
              </Text>
              <Text
                style={{ marginBottom: 10, color: 'green' }}>
                {item.price}
              </Text>
              <RneButton
                icon={{ name: 'shopping-cart' }}
                backgroundColor='green'
                style={{ margin: 0, padding: 0 }}
                onPress={() => this.props.onBuyPress(item)}
                title={I18n.t('buyNow')} />
            </Card>
          </View>
        </TouchableHighlight>
      }
    />)
  }
}
