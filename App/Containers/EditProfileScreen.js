import React, { Component, PropTypes } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import {cloneDeep} from 'lodash'
import I18n from 'react-native-i18n'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import * as UserProfileModel from '../Models/UserProfileModel'
import BackHeader from '../Components/BackHeader'
import UserActions from '../Redux/UserRedux'
import { validateField } from '../Lib/validator'

// Styles
import styles from './Styles/EditProfileScreenStyle'

class EditProfileScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    attemptUpdateProfile: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      fields: cloneDeep(UserProfileModel.profile)
    }
    this.updateState = this.updateState.bind(this)
  }

  componentWillMount () {
    var newFieldState = cloneDeep(this.state.fields)
    const {user} = this.props
    newFieldState.name.value = user.name
    newFieldState.email.value = user.email
    this.updateState(newFieldState)
  }

  updateState (newFieldState) {
    this.setState({ fields: newFieldState })
  }

  validateFields () {
    var state = this.state
    var isValid = true
    Object.keys(state.fields).map((field) => {
      const result = validateField(state.fields, field)
      this.updateState(result)
      if (!result[field].valid) {
        isValid = false
      }
    })
    return isValid
  }

  handlePressUpdateProfile () {
    if (this.validateFields()) {
      const { accessToken } = this.props
      const { name, email, oldPassword, newPassword } = this.state.fields
      console.tron.display({name: 'Press Update',
        value: {
          state: this.state,
          props: this.props
        }})
      this.props.attemptUpdateProfile(accessToken, name.value, email.value, oldPassword.value, newPassword.value)
    }
  }

  render () {
    const { name, email, oldPassword, newPassword } = this.state.fields
    return (
      <View style={{flex: 1}}>
        <View style={styles.hasNavbar}>
          <BackHeader title={I18n.t('profile')} {...this.props} />
        </View>
        <View style={styles.fragmentContainer}>
          <ScrollView>
            <View style={styles.customContainer}>
              <View style={styles.formContainer}>
                <CustomInputField
                  field={name}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomInputField
                  field={email}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomInputField
                  field={oldPassword}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomInputField
                  field={newPassword}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <View style={styles.noteContainer}>
                  <Text style={styles.smallText}>* Change password fields only if you want to change your password</Text>
                </View>
                <CustomButton
                  onPress={() => this.handlePressUpdateProfile()}
                  style={styles.btnUpdate}
                  title={I18n.t('updateProfile')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.tron.display({ name: 'State', value: state })
  return {
    fetching: state.user.fetching,
    error: state.user.error,
    message: state.user.message,
    accessToken: state.login.accessToken,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptUpdateProfile: (accessToken, name, email, oldPassword, newPassword) => {
      console.tron.log(accessToken)
      return dispatch(UserActions.userProfileUpdateRequest(accessToken, name, email, oldPassword, newPassword))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
