// __tests__/AccountTest.js
import 'react-native'
import React from 'react'
import LoginScreen from '../../App/Containers/LoginScreen'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('Login Screen', () => {
  test('renderer correctly', () => {
    const store = mockStore()
    const tree = renderer.create(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
