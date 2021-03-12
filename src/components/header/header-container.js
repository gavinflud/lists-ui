import {AppContext} from '../app/app-context';
import {useContext} from 'react';
import Header from './header-view';

/**
 * Container for the app header.
 */
const HeaderContainer = () => {

  const {user} = useContext(AppContext);

  return <Header user={user}/>;

};

export default HeaderContainer;