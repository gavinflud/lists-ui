import React from 'react';
import {withRouter} from 'react-router-dom';
import Home from './home-view';
import HomeUnauthenticated from './home-unauthenticated-view';

/**
 * Container for the home screen.
 */
class HomeContainer extends React.Component {

  render() {
    if (this.props.user) {
      return <Home/>;
    }

    return <HomeUnauthenticated/>;
  }
}

export default withRouter(HomeContainer);