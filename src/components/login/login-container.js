import React from 'react';
import Login from './login-view';
import auth from '../../utils/auth';

/**
 * Login form component. The login form is a modal that pops up over whatever the user is currently viewing.
 */
class LoginContainer extends React.Component {

  state = {
    isModalActive: false,
    isError: false,
    username: '',
    password: '',
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
   * Handle an input change and update the state accordingly.
   *
   * @param event the change event that took place
   */
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  /**
   * If an error code was returned when trying to authenticate, display an error message to the user.
   */
  handleError = () => {
    this.setState({
      isError: true,
    });
  };

  /**
   * Sends an authentication request to the server with the user's credentials.
   */
  submitForm = () => {
    auth.authenticate(this.state.username, this.state.password)
        .then(this.props.functions.handleSuccessfulAuthentication)
        .catch(this.handleError);
  };

  /**
   * Functions to be provided to child components.
   */
  functions = {
    toggleModal: this.toggleModal,
    handleChange: this.handleChange,
    submitForm: this.submitForm,
  };

  render() {
    return <Login username={this.state.username}
                  password={this.state.password}
                  isModalActive={this.state.isModalActive}
                  isError={this.state.isError}
                  functions={this.functions}/>;
  }

}

export default LoginContainer;