import {Link} from 'react-router-dom';
import TeamForm from '../form/';

/**
 * Shows a list of teams.
 */
const TeamList = (props) => {

  return (
      <div className="gf-sidebar-column-layout">
        <div className="gf-main-column">
          <h1>Teams</h1>

          <button className="button is-success" onClick={props.toggleIsFormVisible}>New Team</button>

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
              <li><Link to="/">Gavin Flood</Link></li>
              <li><Link to="/">James Kavanagh</Link></li>
              <li><Link to="/">Patrick Bamford</Link></li>
            </ul>
          </aside>
        </div>

        <TeamForm isActive={props.isFormVisible}
                  onClose={props.toggleIsFormVisible}
                  onSuccess={props.refresh}/>
      </div>
  );

};

export default TeamList;