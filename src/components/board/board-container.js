import {AppContext} from '../app/app-context';
import {useCallback, useContext, useEffect, useState} from 'react';
import {RequestType, sendRequest} from '../../utils/http';
import Api from '../../utils/api';
import Board from './board-view';
import {BoardContext} from './board-context';

/**
 * Container for the board screen.
 */
const BoardContainer = () => {

  const {user} = useContext(AppContext);
  const {id, cardMap, setCardMap, orderedCards, setOrderedCards} = useContext(BoardContext);
  const [board, setBoard] = useState({name: '', description: ''});

  /*
   * orderedLists is the source of truth for the order of the lists client-side. listMap is a map where the key is
   * the list ID and the value is the list object.
   */
  const [listMap, setListMap] = useState({});
  const [orderedLists, setOrderedLists] = useState([]);

  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isListFormVisible, setIsListFormVisible] = useState(false);

  /**
   * Fetch the board data.
   */
  const getBoard = useCallback(() => {
    sendRequest(RequestType.GET, '/boards/' + id, null, null, true)
        .then((response) => {
          setBoard(response.data.body);
        });
  }, [id]);

  /**
   * Fetch the lists data.
   */
  const getLists = useCallback(() => {
    Api.getListsForBoard(parseInt(id))
        .then(lists => {
          // Adding this property allows us to later prevent dragging on certain interactions
          lists.forEach(list => list.isDraggable = true);
          const updatedListMap = lists.reduce((listMap, list) => ({
            ...listMap,
            [list.id]: list,
          }), {});

          setOrderedLists(lists.sort((a, b) => a.priority - b.priority)
              .map(list => list.id));
          setListMap(updatedListMap);
        });
  }, [id]);

  /**
   * Fetch the cards data.
   */
  const getCards = useCallback(() => {
    const callsToCardsAPI = orderedLists.map(listId => {
      return Api.getCardsForList(listId)
          .then(cards => {
            // Adding this property allows us to later prevent dragging on certain interactions
            cards.forEach(card => card.isDraggable = true);
            return cards;
          });
    });

    // Separate call to the API for each list, then flatten the card array results from each and setup the map
    Promise.all(callsToCardsAPI)
        .then(cards => {
          const flattenedCards = cards.flat();
          const updatedCardMap = flattenedCards.reduce((map, card) => ({
            ...map,
            [card.id]: card,
          }), {});
          setCardMap(updatedCardMap);
          //cardMapRef.current = updatedCardMap;

          setOrderedCards(flattenedCards
              .sort((a, b) => a.priority - b.priority)
              .reduce((map, card) => ({
                ...map,
                [card.listId]: [
                  ...(map[card.listId] || []),
                  card.id,
                ],
              }), {}));
        });

  }, [orderedLists, setCardMap, setOrderedCards]);

  /**
   * Load the board on first render.
   */
  useEffect(() => {
    if (user && id) {
      getBoard();
      getLists();
    }
  }, [user, id, getBoard, getLists]);

  /**
   * Refresh the board and list data.
   */
  useEffect(() => {
    if (shouldRefresh) {
      getBoard();
      getLists();
      setShouldRefresh(false);
    }
  }, [shouldRefresh, getBoard, getLists, setShouldRefresh]);

  /**
   * Load the cards after the lists have been retrieved and ordered.
   */
  useEffect(() => {
    if (Object.keys(cardMap).length === 0 && orderedLists.length > 0
        && orderedLists.length === Object.keys(listMap).length) {
      getCards();
    }
  }, [listMap, orderedLists, cardMap, getCards]);

  /**
   * Handle when a change was made to orderedLists, as this means the priority for the matching list in listMap needs
   * to be updated. Also updates lists on server side if they have been modified on client side.
   */
  useEffect(() => {
    let shouldUpdateLists = false;

    if (orderedLists.length > 0 && orderedLists.length === Object.keys(listMap).length) {
      orderedLists.forEach((listId, i) => {
        if (listMap[listId].priority !== i) {
          shouldUpdateLists = true;
          listMap[listId].priority = i;
        }
      });

      // These two need to be kept in sync
      setListMap(listMap);
    }

    if (shouldUpdateLists) {
      sendRequest(RequestType.PUT, '/lists', {boardId: board.id}, {lists: Object.values(listMap)}, true);
    }
  }, [orderedLists, listMap, board.id]);

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

    if (result.type === 'LIST') {
      // If a list was dragged, we reorder them and update the server
      const reorderedLists = reorder(orderedLists, source.index, destination.index);
      setOrderedLists(reorderedLists);
    } else if (result.type === 'CARD') {
      // If a card was dragged, we update the provider so the list can reorder them and update the server
      const sourceId = parseInt(source.droppableId.replace('droppable-list-', ''));
      const destinationId = parseInt(destination.droppableId.replace('droppable-list-', ''));

      // If the card movement occurred within the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(orderedCards[destinationId], source.index, destination.index);
        setOrderedCards({
          ...orderedCards,
          [destinationId]: reorderedCards,
        });
      } else {
        // If the card movement occurred between two lists
        const sourceList = Array.from(orderedCards[sourceId]);
        const destinationList = Array.from(orderedCards[destinationId] || []);

        const [card] = sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, card);

        setOrderedCards({
          ...orderedCards,
          [sourceId]: sourceList,
          [destinationId]: destinationList,
        });
      }
    }
  };

  /**
   * Toggle the isFormVisible flag value.
   */
  const toggleIsListFormVisible = () => {
    setIsListFormVisible(!isListFormVisible);
  };

  /**
   * Refresh the board.
   */
  const refresh = () => {
    setShouldRefresh(true);
  };

  /**
   * Toggle if a list is draggable or not.
   *
   * @param list the list to toggle
   */
  const toggleIsListDraggable = list => {
    const listToUpdate = listMap[list.id];
    listToUpdate.isDraggable = !listToUpdate.isDraggable;

    setListMap({
      ...listMap,
      [listToUpdate.id]: listToUpdate,
    });
  };

  const functions = {
    onDragEnd,
    refresh,
    toggleIsListDraggable,
    isListFormVisible,
    toggleIsListFormVisible,
  };

  return <Board board={board}
                listMap={listMap}
                orderedLists={orderedLists}
                cardMap={cardMap}
                orderedCards={orderedCards}
                functions={functions}/>;

};

export default BoardContainer;