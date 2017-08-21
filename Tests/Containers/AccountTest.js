// __tests__/AccountTest.js
import 'react-native'
import React from 'react'
import AccountScreen from '../../App/Containers/AccountScreen'
import LoginScreen from '../../App/Containers/LoginScreen'
import StorageService from '../../App/Services/StorageService'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import createStore from '../../App/Redux'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('Account Screen', () => {
  test('renderer correctly', () => {
    const store = mockStore()
    const tree = renderer.create(
      <Provider store={store}>
        <AccountScreen />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('user has not been login, render correctly ', () => {
    const initialState = { isLoggedIn: false}
    const store = mockStore(initialState)
    const tree = renderer.create(
      <Provider store={store}>
        <AccountScreen />
      </Provider>
        ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('user has been login, render correctly', () => {
    const initialState = { isLoggedIn: true}
    const store = mockStore(initialState)
    const tree = renderer.create(
      <Provider store={store}>
        <AccountScreen />
      </Provider>
        )
  })
})
