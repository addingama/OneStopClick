import 'react-native'
import React from 'react'
import { CustomInputField } from '../../App/Components/FormGenerator'
import renderer from 'react-test-renderer'

test('CustomInputField component renders correctly if field props set for unsecure text', () => {
  const email = {
    name: 'email',
    secureText: false,
    value: '',
    valid: true,
    edited: false,
    validation: ['required', 'email'],
    returnKeyType: 'next',
    keyboardType: 'email-address'
  }
  const tree = renderer.create(<CustomInputField field={email}/>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('CustomInputField component renders correctly if field props set for unsecure text', () => {
  const password = {
    name: 'password',
    secureText: true,
    value: '',
    valid: true,
    edited: false,
    validation: ['required'],
    returnKeyType: 'done',
    keyboardType: 'default'
  }
  const tree = renderer.create(<CustomInputField field={password}/>).toJSON()
  expect(tree).toMatchSnapshot()
})