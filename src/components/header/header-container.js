import {useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import {AppContext} from '../app/app-context';
import Header from './header-view';

/**
 * Container for the app header.
 */
const HeaderContainer = () => {

  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const {user, handleLogout} = useContext(AppContext);
  const navigate = useNavigate();

  /**
   * Log the user out of the application.
   */
  const logout = () => {
    handleLogout();
    navigate('/');
  };

  /**
   * Toggles whether the burger dropdown menu is active or not.
   */
  const toggleBurgerState = event => {
    event.preventDefault();
    setIsBurgerActive(!isBurgerActive);
  };
  
  return <Header user={user}
                 logout={logout}
                 isBurgerActive={isBurgerActive}
                 toggleBurgerState={toggleBurgerState}/>;

};

export default HeaderContainer;