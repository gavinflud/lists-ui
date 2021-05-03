import {useHistory} from 'react-router-dom';
import {useContext} from 'react';
import {AppContext} from '../app/app-context';
import Header from './header-view';

/**
 * Container for the app header.
 */
const HeaderContainer = () => {

  const {user, handleLogout} = useContext(AppContext);
  const history = useHistory();

  /**
   * Log the user out of the application.
   */
  const logout = () => {
    handleLogout();
    history.push('/');
  };

  return <Header user={user}
                 logout={logout}/>;

};

export default HeaderContainer;