import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class HomeDrawerBase extends Component {
  static getNavigationOptions () {
    return {
      drawerIcon: ({ tintColor }) => {
        return (
          <MaterialIcons
            name='home'
            size={24}
            style={{ color: tintColor }}
          />
        )
      }
    }
  }
}

export default HomeDrawerBase
