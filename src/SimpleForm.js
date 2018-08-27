import * as React from "react";
import {
  FormBuilder,
  FieldControl,
  FieldGroup,
  Form,
  Validators
} from "./form-lib";
import Values from "./Values";
import styles from "./styles";
import {
  TextInput,
  Checkbox,
  GenderRadio,
  SelectBox,
  TextArea
} from "./components";

const myForm = FormBuilder.group({
  first_name: ["", Validators.required],
  last_name: "",
  gender: "male",
  nationality: "",
  terms: false,
  notes: ""
});
class SimpleForm extends React.Component {
  // Create a group of form controls with default values.
  myForm = FormBuilder.group({
    first_name: ["", Validators.required],
    last_name: "",
    gender: "male",
    nationality: "",
    terms: false,
    notes: ""
  });
  handleSubmit(e) {
    e.preventDefault();
    alert(`You submitted \n ${JSON.stringify(this.myForm.value, null, 2)}`);
  }
  handleReset() {
    this.myForm.reset();
  }
  render() {
    return (
      <div style={styles.main}>
        <h2>Simple Form</h2>
        <FieldGroup
          control={this.myForm}
          render={({ pristine, value, invalid }) => (
            <form onSubmit={() => this.handleSubmit}>
              <FieldControl
                name="first_name"
                render={TextInput}
                // Use meta to add some extra props
                meta={{
                  label: "First Name",
                  placeholder: "Enter first name"
                }}
              />

              <FieldControl
                name="last_name"
                meta={{
                  label: "Last Name",
                  placeholder: "Enter last name"
                }}
                render={TextInput}
              />

              <FieldControl name="gender" render={GenderRadio} />

              <FieldControl name="nationality" render={SelectBox} />


              <FieldControl name="terms" render={Checkbox} />

              <div>
                <button
                  disabled={pristine || invalid}
                  style={styles.button}
                  onClick={e => this.handleSubmit(e)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  style={styles.button}
                  onClick={() => this.handleReset()}
                >
                  Reset
                </button>
              </div>
              <Values value={value} />
            </form>
          )}
        />
      </div>
    );
  }
}

export const ReactiveForm = Form(SimpleForm,myForm);