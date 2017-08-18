import 'react-native'
import React from 'react'
import CategoryChooser from '../../App/Components/CategoryChooser'
import renderer from 'react-test-renderer'
const items = [
  {
    id: 1,
    name: 'All Category'
  },
  {
    id: 2,
    name: 'Movie'
  }
]
test('CategoryChooser component renders correctly', () => {
  const tree = renderer.create(<CategoryChooser selectedValue='Movie' items={items} onValueChange={() => alert('changed')} />).toJSON()
  expect(tree).toMatchSnapshot()
})
