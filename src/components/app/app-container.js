import React from 'react';
import App from './app-view';
import auth from '../../utils/auth';

/**
 * Root container for the application.
 */
class AppContainer extends React.Component {

  state = {
    user: null,
    hasRefreshedToken: false,
  };

  /**
   * If the user hasn't been initialised in the state yet, try to initialise it from a stored access token.
   */
  componentDidMount = () => {
    const accessToken = localStorage.getItem(auth.ACCESS_TOKEN);
    if (!this.state.user && accessToken) {
      this.handleSuccessfulAuthentication(accessToken);
    }
  };

  /**
   * Take an access token provided by the server (either just now or at some point in the past) and initialise the user
   * state from it, essentially logging the user in.
   *
   * If the access token has expired, try to refresh it.
   *
   * @param token the access token provided by the server
   */
  handleSuccessfulAuthentication = (token) => {
    auth.decode(token)
        .then((decoded) => {
          // Only store the user details if the JWT hasn't expired yet
          if (!(decoded.exp * 1000 < new Date().getTime())) {
            this.setState({
              user: {
                firstName: decoded.firstName,
                lastName: decoded.lastName,
              },
              hasRefreshedToken: false,
            });
          } else if (!this.state.hasRefreshedToken) {
            // If we haven't attempted a refresh of the tokens yet then try that
            const refreshToken = localStorage.getItem(auth.REFRESH_TOKEN);
            if (refreshToken) {
              this.setState({hasRefreshedToken: true});
              auth.refresh(refreshToken)
                  .then((accessToken) => {
                    this.handleSuccessfulAuthentication(accessToken);
                  })
                  .catch(() => {});
            }
          } else {
            this.setState({hasRefreshedToken: false});
          }
        });
  };

  /**
   * Functions to be provided to child components.
   */
  functions = {
    handleSuccessfulAuthentication: this.handleSuccessfulAuthentication,
  };

  render() {
    return <App user={this.state.user} functions={this.functions}/>;
  }

}

export default AppContainer;