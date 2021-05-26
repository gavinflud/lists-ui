import {Link} from 'react-router-dom';
import BoardForm from '../form/';

/**
 * Shows a list of boards.
 */
const BoardList = (props) => {

  return (
      <div className="gf-sidebar-column-layout">
        <div className="gf-main-column">
          <h1>Boards</h1>

          <button className="button is-success" onClick={props.toggleIsFormVisible}>New Board</button>

          <div className="menu">
            <ul className="menu-list">
              {
                props.boards.map(
                    (board) => <li key={board.id}><Link to={'/boards/' + board.id}>{board.name}</Link></li>)
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

        <BoardForm isActive={props.isFormVisible}
                   onClose={props.toggleIsFormVisible}
                   onSuccess={props.refresh}/>
      </div>
  );

};

export default BoardList;