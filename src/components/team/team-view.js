import './team-view.scss';
import {Link} from 'react-router-dom';

/**
 * The view for a single team.
 */
const Team = (props) => {

  return (
      <div className="gf-sidebar-column-layout">
        <div className="gf-main-column">
          <h1>{props.team.name}</h1>

          <Link to="/boards/create" className="button is-success">New Board</Link>
        </div>
        <div className="gf-secondary-column">
          <h2>Members</h2>

          <aside className="menu">
            <ul className="menu-list">
              <li><a>Gavin Flood</a></li>
              <li><a>James Kavanagh</a></li>
              <li><a>Patrick Bamford</a></li>
            </ul>
          </aside>
        </div>
      </div>
  );

};

export default Team;