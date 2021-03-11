import React, {useEffect, useState} from 'react';
import App from './app-view';
import auth from '../../utils/auth';

/**
 * Root container for the application.
 */
const AppContainer = () => {

  const [user, setUser] = useState(null);
  const [hasRefreshedToken, setHasRefreshedToken] = useState(false);

  /**
   * If the user hasn't been initialised in the state yet, try to initialise it from a stored access token.
   */
  useEffect(() => {
    const accessToken = localStorage.getItem(auth.ACCESS_TOKEN);
    if (!user && accessToken) {
      handleSuccessfulAuthentication(accessToken);
    }
  });

  /**
   * Take an access token provided by the server (either just now or at some point in the past) and initialise the user
   * state from it, essentially logging the user in.
   *
   * If the access token has expired, try to refresh it.
   *
   * TODO: Investigate empty catch on handleSuccessfulAuthentication
   *
   * @param token the access token provided by the server
   */
  const handleSuccessfulAuthentication = (token) => {
    auth.decode(token)
        .then((decoded) => {
          // Only store the user details if the JWT hasn't expired yet
          if (!(decoded.exp * 1000 < new Date().getTime())) {
            setUser({
              firstName: decoded.firstName,
              lastName: decoded.lastName,
            });
            setHasRefreshedToken(false);
          } else if (!hasRefreshedToken) {
            // If we haven't attempted a refresh of the tokens yet then try that
            const refreshToken = localStorage.getItem(auth.REFRESH_TOKEN);
            if (refreshToken) {
              setHasRefreshedToken(true);
              auth.refresh(refreshToken)
                  .then((accessToken) => {
                    handleSuccessfulAuthentication(accessToken);
                  })
                  .catch(() => {});
            }
          } else {
            setHasRefreshedToken(false);
          }
        });
  };

  /**
   * Functions to be provided to child components.
   */
  const functions = {
    handleSuccessfulAuthentication: handleSuccessfulAuthentication,
  };

  return <App user={user} functions={functions}/>;

};

export default AppContainer;