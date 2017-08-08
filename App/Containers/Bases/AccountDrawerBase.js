import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class AccountDrawerBase extends Component {
  static getNavigationOptions () {
    return {
      drawerIcon: ({ tintColor }) => {
        return (
          <MaterialIcons
            name='account-circle'
            size={24}
            style={{ color: tintColor }}
          />
        )
      }
    }
  }
}

export default AccountDrawerBase
