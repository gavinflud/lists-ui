import {useContext, useEffect} from 'react';
import App from './app-view';
import auth from '../../utils/auth';
import {AppContext} from './app-context';

/**
 * Root container for the application.
 */
const AppContainer = () => {

  const {user, handleSuccessfulAuthentication} = useContext(AppContext);

  /**
   * If the user hasn't been initialised in the state yet, try to initialise it from a stored access token.
   */
  useEffect(() => {
    const accessToken = localStorage.getItem(auth.ACCESS_TOKEN);
    if (!user && accessToken) {
      handleSuccessfulAuthentication(accessToken);
    }
  });

  return <App/>;

};

export default AppContainer;