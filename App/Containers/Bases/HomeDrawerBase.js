import React from 'react'
import DrawerBase from './DrawerBase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class HomeDrawerBase extends DrawerBase {
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
