import { AsyncStorage } from 'react-native'

const ACCESS_TOKEN = 'accessToken'
// const REFRESH_TOKEN = 'refreshToken'

class StorageService {
  static saveSession (accessToken) {
    AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
    // AsyncStorage.setItem(REFRESH_TOKEN, refreshToken)
  }

  static removeSession () {
    AsyncStorage.removeItem(ACCESS_TOKEN)
    // AsyncStorage.removeItem(REFRESH_TOKEN)
  }

  static getAccessToken () {
    return AsyncStorage.getItem(ACCESS_TOKEN)
  }

  static isLoggedIn () {
    return this.getAccessToken().then((accessToken) => {
      return accessToken
    })
  }
}

export default StorageService
