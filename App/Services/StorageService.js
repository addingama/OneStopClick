import { AsyncStorage } from 'react-native'

const ACCESS_TOKEN = 'accessToken'
// const REFRESH_TOKEN = 'refreshToken'

class StorageService {
  static saveSession (accessToken) {
    AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
    // AsyncStorage.setItem(REFRESH_TOKEN, refreshToken)
  }

  static getAccessToken () {
    AsyncStorage.getItem(ACCESS_TOKEN).then((accessToken) => {
      return accessToken
    })
  }

  static isLoggedIn () {
    const accessToken = this.getAccessToken()
    if (accessToken != null) {
      return true
    }
    return false
  }

  static removeSession () {
    AsyncStorage.setItem(ACCESS_TOKEN, '')
    // AsyncStorage.removeItem(REFRESH_TOKEN)
  }
}

export default StorageService
