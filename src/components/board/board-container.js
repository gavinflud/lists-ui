import {useParams} from 'react-router-dom';
import {AppContext} from '../app/app-context';
import {useContext, useEffect, useState} from 'react';
import {RequestType, sendRequest} from '../../utils/http';
import Api from '../../utils/api';
import Board from './board-view';

/**
 * Container for the board screen.
 */
const BoardContainer = () => {

  const {id} = useParams();
  const {user} = useContext(AppContext);
  const [board, setBoard] = useState({name: '', description: ''});
  const [lists, setLists] = useState([]);

  /**
   * Load the board on first render.
   */
  useEffect(() => {

    const getBoard = () => {
      sendRequest(RequestType.GET, '/boards/' + id, null, null, true)
          .then((response) => {
            setBoard(response.data.body);
          });
    };

    const getLists = () => {
      Api.getListsForBoard(parseInt(id))
          .then(lists => setLists([{id: 1, name: 'Backlog'}, {id: 2, name: 'In Progress'}]));
    };

    if (user && id) {
      getBoard();
      getLists();
    }
  }, [user, id]);

  return <Board board={board}
                lists={lists}/>;

};

export default BoardContainer;