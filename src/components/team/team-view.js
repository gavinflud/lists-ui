import './team-view.scss';
import {Link} from 'react-router-dom';
import BoardForm from '../board/form/board-form-container';

/**
 * The view for a single team.
 */
const Team = (props) => {

  return (
      <div className="gf-sidebar-column-layout">
        <div className="gf-main-column">
          <h1>{props.team.name}</h1>

          <button className="button is-success" onClick={props.toggleIsFormVisible}>New Board</button>

          <div className="menu">
            <ul className="menu-list">
              {
                props.boards.map(board => <li key={board.id}><Link to={'/boards/' + board.id}>{board.name}</Link></li>)
              }
            </ul>
          </div>
        </div>
        <div className="gf-secondary-column">
          <h2>Members</h2>

          <aside className="menu">
            <ul className="menu-list">
              {props.members.map(
                  member => <li key={member.id}><Link to="/">{member.firstName} {member.lastName}</Link></li>)}
            </ul>
          </aside>
        </div>

        <BoardForm isActive={props.isFormVisible}
                   onClose={props.toggleIsFormVisible}
                   onSuccess={props.refresh}/>
      </div>
  );

};

export default Team;