import 'react-native'
import React from 'react'
import DrawerHeader from '../../App/Components/DrawerHeader'
import renderer from 'react-test-renderer'

test('DrawerHeader component renders correctly', () => {
  const tree = renderer.create(<DrawerHeader title='Drawer title' />).toJSON()
  expect(tree).toMatchSnapshot()
})
