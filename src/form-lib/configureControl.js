import { FormGroup, FormControl } from './model'
import { warning } from './utils'

const getControlFromReference = (reference, options, formState) => {
  switch (reference) {
    case 'FormGroup':
      return new FormGroup({}, options)
    case 'FormControl':
      return new FormControl(formState, options)
    default:
      return null
  }
}
const configureControl = (props, context, reference) => {
  const { name, parent, options, control, formState, meta } = props
  const parentControl = parent || context.parentControl
  let returnControl = null
  if (control) {
    if (reference === 'FormGroup' && control instanceof FormGroup) {
      returnControl = control
    } else if (reference === 'FormControl' && control instanceof FormControl) {
      returnControl = control
    } else {
      warning(null, `Control should be an instance of ${reference}.`)
    }
  } else {
    if (name) {
      /**
       * The presence of name prop signifies two things:-
       * 1. The group control has to be added as a nested control i.e parent should be present.
       * 2. Parent must be an instance of FormGroup
       */
      warning(
        parentControl,
        `Error in ${name} control: Missing parent control.
             Please make sure that the component is wrapped in a FieldGroup or
             you can explicitly pass a parent control as a parent prop.`
      )
      warning(
        parentControl && parentControl instanceof FormGroup,
        `Error in ${name} control: A name prop can only be used if the parent is an instance of FormGroup,
             You can use the index prop instead of name, if the parent control is an instance of FormArray`
      )
      if (parentControl && parentControl instanceof FormGroup) {
        /**
         * Check the presence of the control, if a control is already present in the parent control
         * then don't add a new control, return the same.
         */
        if (!parentControl.get(name)) {
          parentControl.addControl(
            name,
            getControlFromReference(reference, options, formState)
          )
        } else {
          // warning(null, `A control is already present with name ${name}.`)
        }
        returnControl = parentControl.get(name)
      }
    } else {
        // Create a new instance and return as control in case of FormGroup
        if (reference === 'FormGroup') {
          returnControl = getControlFromReference(reference, options, formState)
        }
    }
  }
  // Add the meta data about the control
  if (returnControl && meta) {
    returnControl.meta = meta
  }
  return returnControl
}

export default configureControl
