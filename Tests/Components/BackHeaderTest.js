import 'react-native'
import React from 'react'
import BackHeader from '../../App/Components/BackHeader'
import renderer from 'react-test-renderer'

test('BackHeader component renders correctly', () => {
  const tree = renderer.create(<BackHeader title='title' />).toJSON()
  expect(tree).toMatchSnapshot()
})