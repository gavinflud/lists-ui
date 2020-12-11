import { Link } from 'react-router-dom'
import './header.scss'

const Header = (props) => {
  return (
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
        <div className="navbar-start">
          <Link to="/teams" className="navbar-item">Teams</Link>
          <Link to="/boards" className="navbar-item">Boards</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-link"><strong>Sign up</strong></a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header