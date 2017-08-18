import React, { Component, PropTypes } from 'react'
import { Picker } from 'react-native'
import styles from './Styles/CategorySpinnerStyle'

export default class CategorySpinner extends Component {
  generatePickerItems (items) {
    return items.map(function (item) {
      return (
        <Picker.Item label={item.name} value={item.name} key={item.id} />
      )
    })
  }
  render () {
    const { selectedValue, items, onValueChange } = this.props
    return (
      <Picker selectedValue={selectedValue} onValueChange={(value) => onValueChange(value)}>
        {this.generatePickerItems(items)}
      </Picker>
    )
  }
}

CategorySpinner.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired
}
