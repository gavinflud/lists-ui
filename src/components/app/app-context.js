import {createContext, useState} from 'react';
import auth from '../../utils/auth';

/**
 * Stores the global app context.
 *
 * @type {React.Context<{}>}
 */
export const AppContext = createContext({});

/**
 * Provides the global app context to all descendents of this provider that consume it.
 *
 * @param children any child components
 */
export const AppProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [hasRefreshedToken, setHasRefreshedToken] = useState(false);

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
              id: decoded.id,
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

  const value = {user, setUser, hasRefreshedToken, setHasRefreshedToken, handleSuccessfulAuthentication};

  return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
  );
};