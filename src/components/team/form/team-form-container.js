import React from 'react';
import TeamForm from './team-form-view';
import {RequestType, sendRequest} from '../../../utils/http';

/**
 * Team form component. This form allows for teams to be created or updated.
 */
class TeamFormContainer extends React.Component {

  state = {
    form: {
      name: '',
    },
    isLoading: false,
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
    });
  };

  /**
   * Try to create/update the team.
   *
   * TODO: Change to react-router redirecting
   */
  submitForm = () => {
    this.toggleLoading()
        .then(() => sendRequest(RequestType.POST, '/teams', null, this.state.form, true))
        .then(this.toggleLoading)
        .then(() => window.location.replace('/'));
  };

  /**
   * Functions to be provided to child components.
   */
  functions = {
    handleChange: this.handleChange,
    submitForm: this.submitForm,
  };

  render() {
    return <TeamForm form={this.state.form} functions={this.functions} isLoading={this.state.isLoading}/>;
  }
}

export default TeamFormContainer;