import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Register from './register-view';
import {RequestType, sendRequest} from '../../utils/http';
import auth from '../../utils/auth';
import {useInput} from '../../utils/hooks/input-hook';
import emailValidator from 'email-validator';
import {AppContext} from '../app/app-context';

/**
 * Register form component. The registration form is a modal that pops up over whatever the user is currently viewing.
 */
const RegisterContainer = (props) => {

  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const previousIsFormSubmittingRef = useRef(isFormSubmitting);
  const [validationErrors, setValidationErrors] = useState({});
  const firstName = useInput('');
  const lastName = useInput('');
  const username = useInput('');
  const password = useInput('');
  const retypedPassword = useInput('');
  const {handleSuccessfulAuthentication} = useContext(AppContext);

  /**
   * If the modal is showing, hide it. If the modal is hidden, show it.
   */
  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  /**
   * Validate the form contents.
   */
  const validate = useCallback(() => {
    const errors = {};
    if (!emailValidator.validate(username.value)) {
      errors['username'] = 'Email address is invalid.';
    }

    if (firstName.value === '') {
      errors['firstName'] = 'First name is required.';
    }

    if (lastName.value === '') {
      errors['lastName'] = 'Last name is required.';
    }

    if (password.value.length < 12) {
      errors['password'] = 'Password must be a minimum of 12 characters.';
    }

    if (password.value !== retypedPassword.value) {
      errors['retypedPassword'] = 'Passwords must match.';
    }

    setValidationErrors(errors);
  }, [username.value, firstName.value, lastName.value, password.value, retypedPassword.value]);

  /**
   * Utility method to find the validation error for a given input.
   *
   * @param key identifier for the input
   * @returns {String} the validation error if it exists, or undefined otherwise
   */
  const getValidationError = (key) => {
    return validationErrors[key];
  };

  /**
   * Try to register the user.
   */
  const submitForm = () => {
    validate();
    setIsFormSubmitting(true);
  };

  /**
   * Validate when any form data changes.
   */
  useEffect(validate,
      [firstName.value, lastName.value, username.value, password.value, retypedPassword.value, validate]);

  /**
   * Send a request to register the user once the form is submitted and there are no validation errors, then attempt to
   * log them in.
   *
   * TODO: Add email verification step so user isn't immediately logged in
   */
  useEffect(() => {
    const isValid = validationErrors
        && Object.keys(validationErrors).length === 0
        && validationErrors.constructor === Object;

    if (previousIsFormSubmittingRef.current !== isFormSubmitting && isFormSubmitting && isValid) {
      sendRequest(RequestType.POST, '/users', null, {
        user: {
          firstName: firstName.value,
          lastName: lastName.value,
        },
        credential: {
          emailAddress: username.value,
          password: password.value,
        },
      }, false)
          .then(() => auth.authenticate(username.value, password.value))
          .then(handleSuccessfulAuthentication);
    }
  }, [
    isFormSubmitting,
    validationErrors,
    firstName.value,
    lastName.value,
    username.value,
    password.value,
    handleSuccessfulAuthentication,
  ]);

  /**
   * Functions to be provided to child components.
   */
  const functions = {
    toggleModal: toggleModal,
    submitForm: submitForm,
    getValidationError: getValidationError,
  };

  return <Register firstName={firstName}
                   lastName={lastName}
                   username={username}
                   password={password}
                   retypedPassword={retypedPassword}
                   isModalActive={isModalActive}
                   functions={functions}
                   isLoading={isFormSubmitting}/>;

};

export default RegisterContainer;