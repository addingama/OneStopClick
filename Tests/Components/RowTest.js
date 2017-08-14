import 'react-native'
import React from 'react'
import Row from '../../App/Components/Row'
import renderer from 'react-test-renderer'

test('Row component renders correctly', () => {
  const tree = renderer.create(<Row />).toJSON()
  expect(tree).toMatchSnapshot()
})


// import React from 'react'
// import { Text } from 'react-native'
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
// import Row from '../../App/Components/Row'

// describe('Row Component', () => {
//   it('should render without issues', () => {
//     const component = shallow(<Row />)

//     expect(component.length).toBe(1)
//     expect(toJson(component)).toMatchSnapshot()
//   })

//   it('should render children', () => {
//     const component = shallow(
//       <Row containerStyle={{ height: 100 }}><Text>Hi</Text></Row>
//     )

//     expect(component.find('Text').length).toBe(1)
//   })

//   it('should render with onPress', () => {
//     const onPress = jest.fn()
//     const component = shallow(
//       <Row
//         onPress={onPress}
//         containerStyle={{ backgroundRowor: 'peru' }}
//         size={3}
//       />
//     )

//     component.simulate('press')
//     expect(onPress).toHaveBeenCalled()
//   })
// })
