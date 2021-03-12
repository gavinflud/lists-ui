import {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import Home from './home-view';
import HomeUnauthenticated from './home-unauthenticated-view';
import {AppContext} from '../app/app-context';

/**
 * Container for the home screen.
 */
const HomeContainer = (props) => {

  const {user} = useContext(AppContext);

  if (user) {
    return <Home/>;
  }

  return <HomeUnauthenticated/>;
};

export default withRouter(HomeContainer);