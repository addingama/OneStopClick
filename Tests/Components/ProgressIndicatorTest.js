import 'react-native'
import React from 'react'
import ProgressIndicator from '../../App/Components/ProgressIndicator'
import renderer from 'react-test-renderer'

test('ProgressIndicator component renders correctly if show is true', () => {
  const tree = renderer.create(<ProgressIndicator show text='howdy' />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ProgressIndicator component does not render if show is false', () => {
  const tree = renderer.create(<ProgressIndicator title='howdy' show={false} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ProgressIndicator component renders correctly if title prop is set', () => {
  const tree = renderer.create(<ProgressIndicator title='howdy' show />).toJSON()
  expect(tree).toMatchSnapshot()
})
