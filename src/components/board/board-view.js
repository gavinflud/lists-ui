import List from '../list/';
import './board-view.scss';

/**
 * The view for a single board.
 */
const Board = (props) => {

  return (
      <section className="section gf-board-view">
        <h1>{props.board.name}</h1>

        <div className="gf-lists-container">
          {props.lists.map(list => <List list={list}/>)}

          <div className="gf-list-container gf-list-container-button">
            <button>New List</button>
          </div>
        </div>
      </section>
  );

};

export default Board;

