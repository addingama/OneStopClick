import 'react-native'
import React from 'react'
import { HamburgerMenu } from '../../App/Components/FormGenerator'
import renderer from 'react-test-renderer'

test('HamburgerMenu component renders correctly', () => {
  const tree = renderer.create(<HamburgerMenu />).toJSON()
  expect(tree).toMatchSnapshot()
})
