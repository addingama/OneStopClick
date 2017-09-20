import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'react-native-elements'

export default class CategoryChooser extends Component {
  generateItems (items) {
    const { selectedValue, onValueChange } = this.props
    return items.map(function (item) {
      return (
        <ListItem
          hideChevron={selectedValue !== item.name}
          key={item.id}
          title={item.name}
          onPress={() => onValueChange(item.name)}
          rightIcon={{name: 'check-circle', color: 'green'}}
        />
        // <Picker.Item label={item.name} value={item.name} key={item.id} />
      )
    })
  }
  render () {
    const { items } = this.props
    return (
      <List>
        { this.generateItems(items) }
      </List>
    )
  }
}

CategoryChooser.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired
}
