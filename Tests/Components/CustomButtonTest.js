import 'react-native'
import React from 'react'
import { CustomButton } from '../../App/Components/FormGenerator'
import renderer from 'react-test-renderer'

test('CustomButton component renders correctly if title prop set', () => {
  const tree = renderer.create(<CustomButton title='new button' />).toJSON()
  expect(tree).toMatchSnapshot()
})
