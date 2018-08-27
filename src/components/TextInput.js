import * as React from "react";
import styles from "./../styles";

// React SFC to render Input element
const TextInput = ({
  handler,
  dirty,
  hasError,
  meta
}) => (
  <div>
    <label>{meta.label}:</label>
    <input placeholder={meta.placeholder} style={styles.input} {...handler()} />
    <span style={styles.error}>
        {dirty
        && hasError("required")
        && `${meta.label} is required`}
    </span>
  </div>
  
);

export default TextInput;
