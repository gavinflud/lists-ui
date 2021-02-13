import {Link} from 'react-router-dom';
import Login from '../login/';
import Register from '../register/';
import Search from '../form/search';
import './header.scss';

/**
 * The header view.
 */
const Header = (props) => {
  return (
      <header className="gf-header">
        <nav className="navbar is-primary" role="navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item li-logo">Lists</Link>

            <a role="button" className="navbar-burger" aria-expanded="false"
               data-target="main-navbar">
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
            </a>
          </div>

          <div id="main-navbar" className="navbar-menu">
            {props.user ?
                <div className="navbar-start">
                  <Link to="/teams" className="navbar-item">Teams</Link>
                  <Link to="/boards" className="navbar-item">Boards</Link>
                </div> :
                ''
            }

            <div className="navbar-end">
              {props.user ?
                  <div className="navbar-item">
                    <Search/>
                  </div> :
                  ''
              }
              {props.user ?
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">Gavin Flood</a>
                    <div className="navbar-dropdown is-right">
                      <a className="navbar-item">Profile</a>
                      <a className="navbar-item">Preferences</a>
                    </div>
                  </div> :
                  <div className="navbar-item">
                    <div className="buttons">
                      <Register functions={props.functions}/>
                      <Login functions={props.functions}/>
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