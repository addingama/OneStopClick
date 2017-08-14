import 'react-native'
import React from 'react'
import Grid from '../../App/Components/Grid'
import renderer from 'react-test-renderer'

test('Grid component renders correctly', () => {
  const tree = renderer.create(<Grid />).toJSON()
  expect(tree).toMatchSnapshot()
})

// import React from 'react'
// import { Text } from 'react-native'
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
// import Grid from '../Grid'
// import Row from '../../App/Components/Row'

// describe('Grid Component', () => {
//   it('should render without issues', () => {
//     const component = shallow(<Grid />)

//     expect(component.length).toBe(1)
//     expect(toJson(component)).toMatchSnapshot()
//   })

//   it('should render children', () => {
//     const component = shallow(
//       <Grid containerStyle={{ backgroundColor: 'peru' }}>
//         <Text>Hi</Text>
//         <Row>Bye</Row>
//       </Grid>
//     )

//     expect(component.find('Text').length).toBe(1)
//   })

//   it('should render with onPress', () => {
//     const onPress = jest.fn()
//     const component = shallow(
//       <Grid
//         onPress={onPress}
//         size={3}
//         containerStyle={{ backgroundColor: 'peru' }}
//       />
//     )

//     component.simulate('press')
//     expect(onPress).toHaveBeenCalled()
//   })
// })
