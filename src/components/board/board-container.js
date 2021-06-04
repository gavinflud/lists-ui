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
          .then(lists => setLists(lists));
    };

    if (user && id) {
      getBoard();
      getLists();
    }
  }, [user, id]);

  useEffect(() => {
    // TODO: Update lists on server side when they change on client side
  }, [lists]);

  /**
   * Reorder the items in a list after an item has moved.
   *
   * @param list the list to reorder
   * @param startIndex the index the item started at
   * @param endIndex the index the item moved to
   * @returns Object[] the reordered list
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * Called when the user stops dragging an item.
   *
   * @param result the result after dragging
   */
  const onDragEnd = result => {
    const {source, destination} = result;

    if (!destination) {
      return;
    }

    // This just accounts for lists right now and the droppableId for each list will be the same
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    // TODO: Add logic for when an item moves to a different droppable element
    if (sourceId === destinationId) {
      const reorderedLists = reorder(lists, source.index, destination.index);
      reorderedLists.forEach((list, i) => list.priority = i);
      setLists(reorderedLists);
    }
  };

  return <Board board={board}
                lists={lists}
                onDragEnd={onDragEnd}/>;

};

export default BoardContainer;