import React from 'react';
import emailValidator from 'email-validator';
import Register from './register-view';
import {RequestType, sendRequest} from '../../utils/http';
import auth from '../../utils/auth';

/**
 * Register form component. The registration form is a modal that pops up over whatever the user is currently viewing.
 */
class RegisterContainer extends React.Component {

  state = {
    form: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      retypedPassword: '',
    },
    isModalActive: false,
    isLoading: false,
    validationErrors: {},
  };

  /**
   * If the modal is showing, hide it. If the modal is hidden, show it.
   */
  toggleModal = () => {
    this.setState({
      isModalActive: !this.state.isModalActive,
    });
  };

  /**
   * Toggle the loading status, which can be indicated with a loading icon in the UI.
   *
   * @param args passed from one call in the promise chain to the next one
   * @returns {Promise} resolves with the args passed in
   */
  toggleLoading = (args) => {
    return new Promise((resolve) => {
      this.setState({
        isLoading: !this.state.isLoading,
      }, () => resolve(args));
    });
  };

  /**
   * Handle an input change and update the state accordingly.
   *
   * @param event the change event that took place
   */
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    }, this.validate);
  };

  /**
   * Validate the form contents.
   *
   * @returns {Promise} called when the state has been updated with any validation errors
   */
  validate = () => {
    const validationErrors = {};
    if (!emailValidator.validate(this.state.form.username)) {
      validationErrors['username'] = 'Email address is invalid.';
    }

    if (this.state.form.firstName === '') {
      validationErrors['firstName'] = 'First name is required.';
    }

    if (this.state.form.lastName === '') {
      validationErrors['lastName'] = 'Last name is required.';
    }

    if (this.state.form.password.length < 12) {
      validationErrors['password'] = 'Password must be a minimum of 12 characters.';
    }

    if (this.state.form.password !== this.state.form.retypedPassword) {
      validationErrors['retypedPassword'] = 'Passwords must match.';
    }

    return new Promise((resolve) => {
      this.setState({
        validationErrors: validationErrors,
      }, () => resolve());
    });
  };

  /**
   * Utility method to find the validation error for a given input.
   *
   * @param key identifier for the input
   * @returns {String} the validation error if it exists, or undefined otherwise
   */
  getValidationError = (key) => {
    return this.state.validationErrors[key];
  };

  /**
   * Try to register the user and log them in.
   *
   * TODO: Add email verification step so user isn't immediately logged in
   */
  submitForm = () => {
    this.validate()
        .then(this.toggleLoading)
        .then(() => {
          return sendRequest(RequestType.POST, '/users', null, {
            firstName: this.state.form.firstName,
            lastName: this.state.form.lastName,
            credential: {
              emailAddress: this.state.form.username,
              password: this.state.form.password,
            },
          }, false);
        })
        .then(() => auth.authenticate(this.state.form.username, this.state.form.password))
        .then(this.toggleLoading)
        .then(this.props.functions.handleSuccessfulAuthentication);
  };

  /**
   * Functions to be provided to child components.
   */
  functions = {
    toggleModal: this.toggleModal,
    handleChange: this.handleChange,
    submitForm: this.submitForm,
    getValidationError: this.getValidationError,
  };

  render() {
    return <Register form={this.state.form} isModalActive={this.state.isModalActive} functions={this.functions}
                     isLoading={this.state.isLoading}/>;
  }

}

export default RegisterContainer;