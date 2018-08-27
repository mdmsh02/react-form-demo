import { FormControl, FormGroup } from './model'

function _createControl(controlConfig) {
  if (
    controlConfig instanceof FormControl ||
    controlConfig instanceof FormGroup 
  ) {
    return controlConfig
  } else if (Array.isArray(controlConfig)) {
    const value = controlConfig[0]
    const validator = controlConfig.length > 1 ? controlConfig[1] : null
    const updateOn = controlConfig.length > 2 ? controlConfig[2] : null
    return FormBuilder.control(value, validator, updateOn)
  }
  return FormBuilder.control(controlConfig)
}
function _reduceControls(controlsConfig) {
  const controls = {}
  Object.keys(controlsConfig).forEach(controlName => {
    controls[controlName] = _createControl(controlsConfig[controlName])
  })
  return controls
}
export default class FormBuilder {
  /**
   * Construct a new `FormGroup` with the given map of configuration.
   * Valid keys for the `extra` parameter map are `validators`, & `updateOn`.
   * @param {{[key: string]: any}} controlsConfig
   * @param {{[key: string]: any}|null} extra
   * @return {FormGroup}
   */
  static group(controlsConfig, extra) {
    const controls = _reduceControls(controlsConfig)
    const validators = extra != null ? extra.validators : null
    const updateOn = extra != null ? extra.updateOn : null
    return new FormGroup(controls, { validators, updateOn })
  }
  
  /**
   * Construct a new `FormControl` with the given `formState`,`validator`
   * and `updateOn`
   * `formState` can either be a standalone value for the form control or an object
   * that contains both a value and a disabled status.
   * @param {Object} formState
   * @param {Function|Function[]|null} validator
   * @param {string} updatOn
   * @return {FormControl}
   */
  static control(formState, validators, updateOn) {
    return new FormControl(formState, { validators, updateOn })
  }
}
