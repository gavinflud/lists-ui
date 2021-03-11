import {useState} from 'react';
import Login from './login-view';
import auth from '../../utils/auth';
import {useInput} from '../../utils/hooks/input-hook';

/**
 * Login form component. The login form is a modal that pops up over whatever the user is currently viewing.
 */
const LoginContainer = (props) => {

  const [isModalActive, setIsModalActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const {value: username, bind: bindUsername} = useInput('');
  const {value: password, bind: bindPassword} = useInput('');

  /**
   * If the modal is showing, hide it. If the modal is hidden, show it.
   */
  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  /**
   * Sends an authentication request to the server with the user's credentials.
   */
  const submitForm = () => {
    auth.authenticate(username, password)
        .then(props.functions.handleSuccessfulAuthentication)
        .catch(() => setIsError(true));
  };

  /**
   * Functions to be provided to child components.
   */
  const functions = {
    toggleModal: toggleModal,
    submitForm: submitForm,
  };

  return <Login bindUsername={bindUsername}
                bindPassword={bindPassword}
                isModalActive={isModalActive}
                isError={isError}
                functions={functions}/>;

};

export default LoginContainer;