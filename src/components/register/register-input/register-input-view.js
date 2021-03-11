/**
 * A text/password input for the registration form.
 *
 * The props it takes are:
 *  - name: the name given to the input
 *  - label: the label displayed above the input
 *  - type: text or password
 *  - getValidationError: function that retrieves a particular validation error
 *  - placeholder: text that should be displayed as a placeholder for the input
 *  - icon: font-awesome icon identifier (if applicable)
 *  - value: the value of the input
 *  - onChange: the function to call when the value changes
 */
const RegisterInput = (props) => {

  /**
   * Get the class for an input or help message.
   *
   * The input should be highlighted with the danger colour if validation errors exist and the help text should only be
   * visible in such a situation.
   *
   * @param key the name of the input
   * @param isInput true if the class is associated with an input element, and false if it is associated with help text
   * @returns {String} the class value
   */
  const getErrorClass = (key, isInput) => {
    const validationError = props.getValidationError(key);
    if (isInput) {
      return validationError ? 'input is-danger' : 'input';
    } else {
      return validationError ? 'help is-danger' : 'help is-danger is-hidden';
    }
  };

  return (
      <div className="field">
        <label className="label">{props.label}</label>
        <div className={'control ' + (props.icon ? 'has-icons-left' : '')}>
          <input className={getErrorClass(props.name, true)} type={props.type} name={props.name}
                 placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
          {props.icon ? <span className="icon is-small is-left"><i className={'fas ' + props.icon}/></span> : ''}
          <p className={getErrorClass(props.name)}>{props.getValidationError(props.name)}</p>
        </div>
      </div>
  );

};

export default RegisterInput;