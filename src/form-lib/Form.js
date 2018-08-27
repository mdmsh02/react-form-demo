import React from 'react'
import { FormGroup,FormControl } from './model'
import { getHandler, propsToBeMap } from './utils'

/**
 * @param {FormControl|FormGroup|FormArray} control
 */
function mapControlToProps(control) {
  const mappedObject = {}
  Object.keys(propsToBeMap).forEach(key => {
    const controlProperty = control[propsToBeMap[key]]
    mappedObject[key] = controlProperty
  })
  if (control instanceof FormControl) {
    mappedObject['handler'] = (inputType, value) =>
      getHandler(inputType, value, control)
  }
  return mappedObject
}
/**
 * @param {FormControl|FormGroup|FormArray} control
 * @param {String} name
 */
function mapNestedControls(control, name) {
  var extraProps = {}
  extraProps[name] = mapControlToProps(control)
  if (control instanceof FormGroup && control.controls) {
    Object.keys(control.controls).forEach(childControlName => {
      extraProps[name] = Object.assign(
        extraProps[name],
        mapNestedControls(control.controls[childControlName], childControlName)
      )
    })
  } 
  return extraProps
}
function mapProps(formControls) {
  let extraProps = {}
  if (formControls) {
    Object.keys(formControls).forEach(controlName => {
      const control = formControls[controlName]
      if (control) {
        extraProps = Object.assign(
          extraProps,
          mapNestedControls(control, controlName)
        )
      }
    })
  }
  return extraProps
}
/**
 * Higher order component
 * @param {Component} ReactComponent
 * @param {FormGroup} formGroup
 * @return {Component} Form
 */
function Form(ReactComponent, formGroup) {
  const formControls = formGroup.controls
  const extraProps = mapProps(formControls)
  mapProps(formControls)
  class Form extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        extraProps
      }
      this.updateComponent = this.updateComponent.bind(this)
    }
    componentWillMount() {
      debugger
      // Add listeners
      formGroup.stateChanges.subscribe(() => {
        this.updateComponent()
      })
    }
    componentWillUnmount() {
      //Remove listeners
      if (formGroup.stateChanges.observers) {
        formGroup.stateChanges.observers.forEach(observer => {
          formGroup.stateChanges.unsubscribe(observer)
        })
      }
    }
    updateComponent() {
      debugger
      this.setState({
        extraProps: mapProps(formControls)
      })
    }
    render() {
      debugger
      const props = Object.assign({}, this.props, this.state.extraProps)
      return React.createElement(ReactComponent, props)
    }
  }
  return Form
}
export default Form
