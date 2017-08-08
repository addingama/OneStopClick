import React from 'react'
import DrawerBase from './DrawerBase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class AccountDrawerBase extends DrawerBase {
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
