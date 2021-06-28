import {Link} from 'react-router-dom';
import Login from '../login/';
import Register from '../register/';
import Search from '../form/search';
import './header.scss';

/**
 * The header view.
 */
const Header = ({user, logout, isBurgerActive, toggleBurgerState}) => {
  return (
      <header className="gf-header">
        <nav className="navbar is-primary" role="navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item li-logo">Lists</Link>

            <a role="button"
               className={isBurgerActive ? 'navbar-burger is-active' : 'navbar-burger'}
               aria-expanded="false"
               data-target="main-navbar"
               onClick={toggleBurgerState}>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
            </a>
          </div>

          <div id="main-navbar" className={isBurgerActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            {user ?
                <div className="navbar-start">
                  <Link to="/teams" className="navbar-item">Teams</Link>
                  <Link to="/boards" className="navbar-item">Boards</Link>
                </div> :
                ''
            }

            <div className="navbar-end">
              {user ?
                  <div className="navbar-item">
                    <Search/>
                  </div> :
                  ''
              }
              {user ?
                  <div className="navbar-item has-dropdown is-hoverable">
                    <Link to="/" className="navbar-link">{user.firstName} {user.lastName}</Link>
                    <div className="navbar-dropdown is-right">
                      <Link to="/" className="navbar-item">Profile</Link>
                      <Link to="/" className="navbar-item">Preferences</Link>
                      <Link to="/" className="navbar-item" onClick={logout}>Logout</Link>
                    </div>
                  </div> :
                  <div className="navbar-item">
                    <div className="buttons">
                      <Register/>
                      <Login/>
                    </div>
                  </div>
              }
            </div>
          </div>
        </nav>
      </header>
  );
};

export default Header;