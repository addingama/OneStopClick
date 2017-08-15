import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import {cloneDeep} from 'lodash'
import I18n from 'react-native-i18n'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import * as UserProfileModel from '../Models/UserProfileModel'
import BackHeader from '../Components/BackHeader'

// Styles
import styles from './Styles/EditProfileScreenStyle'

class EditProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: cloneDeep(UserProfileModel.profile)
    }
    this.updateState = this.updateState.bind(this)
  }

  updateState (newFieldState) {
    this.setState({ fields: newFieldState })
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
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
