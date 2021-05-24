import {Link} from 'react-router-dom';

/**
 * Shows a list of teams.
 */
const TeamList = (props) => {

  return (
      <div className="gf-sidebar-column-layout">
        <div className="gf-main-column">
          <h1>Teams</h1>

          <Link to="/teams/create" className="button is-success">New Team</Link>

          <div className="menu">
            <ul className="menu-list">
              {
                props.teams.map((team) => <li key={team.id}><Link to={'/teams/' + team.id}>{team.name}</Link></li>)
              }
            </ul>
          </div>
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

export default TeamList;