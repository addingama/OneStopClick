import 'react-native'
import React from 'react'
import Col from '../../App/Components/Col'
import renderer from 'react-test-renderer'

test('Col component renders correctly', () => {
  const tree = renderer.create(<Col />).toJSON()
  expect(tree).toMatchSnapshot()
})

// import React from 'react'
// import { Text } from 'react-native'
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
// import Col from '../../App/Components/Col'

// describe('Col Component', () => {
//   it('should render without issues', () => {
//     const component = shallow(<Col />)

//     expect(component.length).toBe(1)
//     expect(toJson(component)).toMatchSnapshot()
//   })

//   it('should render children', () => {
//     const component = shallow(
//       <Col containerStyle={{ width: 100 }}><Text>Hi</Text></Col>
//     )

//     expect(component.find('Text').length).toBe(1)
//   })

//   it('should render with onPress', () => {
//     const onPress = jest.fn()
//     const component = shallow(
//       <Col
//         onPress={onPress}
//         containerStyle={{ backgroundColor: 'peru' }}
//         size={3}
//       />
//     )

//     component.simulate('press')
//     expect(onPress).toHaveBeenCalled()
//   })
// })
