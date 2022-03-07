import List from './list-view';
import {useContext, useState} from 'react';
import {AppContext} from '../app/app-context';
import {BoardContext} from '../board/board-context';

/**
 * Container for the list component.
 */
const ListContainer = ({list, cardMap, orderedCards, toggleIsListDraggable}) => {

  const {user} = useContext(AppContext);
  const {setOrderedCards, setCardMap} = useContext(BoardContext);
  const [isCardFormVisible, setIsCardFormVisible] = useState(false);

  /**
   * Toggle the isFormVisible flag value.
   */
  const toggleIsCardFormVisible = () => {
    setIsCardFormVisible(!isCardFormVisible);
    toggleIsListDraggable(list);
  };

  /**
   * Called after creating or updating a card.
   */
  const onCreateOrUpdate = (card) => {
    card.isDraggable = true;
    setCardMap({
      ...cardMap,
      [card.id]: card,
    });
  };

  return <List list={list}
               cardMap={cardMap}
               orderedCards={orderedCards}
               isCardFormVisible={isCardFormVisible}
               toggleIsCardFormVisible={toggleIsCardFormVisible}
               onCreateOrUpdate={onCreateOrUpdate}/>;

};

export default ListContainer;