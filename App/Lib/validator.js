import I18n from 'react-native-i18n'

export function validateField (state, fieldName) {
  var valid = true
  state[fieldName].edited = true
  state[fieldName].validation.map((validationItem) => {
    state[fieldName].edited = true

    if (typeof (validationItem) === 'object' && valid) {
      if (Object.keys(validationItem).toString() === 'minLength') {
        state[fieldName] = validateMinLength(state[fieldName], validationItem.minLength)
        valid = state[fieldName].valid
      }
    }
    if (validationItem === 'email' && valid) {
      state[fieldName] = validateEmail(state[fieldName])
      valid = state[fieldName].valid
    }
    if (validationItem === 'required' && valid) {
      state[fieldName] = validateRequired(state[fieldName])
      valid = state[fieldName].valid
    }
  })
  return state
}

export function validateEmail (field) {
  var isValid = field.value.match('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')
  if (isValid) {
    field.message = ''
    field.valid = true
  } else {
    field.message = I18n.t('emailRequired')
    field.valid = false
  }
  return field
}

export function validateRequired (field) {
  if (field.value == null || field.value === '') {
    field.message = I18n.t('fieldRequired')
    field.valid = false
  } else {
    field.message = ''
    field.valid = true
  }
  return field
}

export function validateMinLength (field, minLength) {
  if (field.value.length <= minLength) {
    field.message = I18n.t('minLength') + minLength
    field.valid = false
  } else {
    field.message = ''
    field.valid = true
  }
  return field
}
