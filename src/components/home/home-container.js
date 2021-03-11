import {withRouter} from 'react-router-dom';
import Home from './home-view';
import HomeUnauthenticated from './home-unauthenticated-view';

/**
 * Container for the home screen.
 */
const HomeContainer = (props) => {

  if (props.user) {
    return <Home/>;
  }

  return <HomeUnauthenticated/>;
};

export default withRouter(HomeContainer);