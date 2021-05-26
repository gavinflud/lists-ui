import Board from './board-view';
import {useParams} from 'react-router-dom';
import {AppContext} from '../app/app-context';
import {useContext, useEffect, useState} from 'react';
import {RequestType, sendRequest} from '../../utils/http';

/**
 * Container for the board screen.
 */
const BoardContainer = () => {

  const {id} = useParams();
  const {user} = useContext(AppContext);
  const [board, setBoard] = useState({name: '', description: ''});

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

    if (user && id) {
      getBoard();
    }
  }, [user]);

  return <Board board={board}/>;

};

export default BoardContainer;