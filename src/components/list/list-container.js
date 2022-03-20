import List from './list-view';
import {useContext, useState} from 'react';
import {BoardContext} from '../board/board-context';

/**
 * Container for the list component.
 */
const ListContainer = ({list, cardMap, orderedCards, toggleIsListDraggable}) => {

  const {setCardMap} = useContext(BoardContext);
  const [isCardFormVisible, setIsCardFormVisible] = useState(false);

  /**
   * Toggle the isFormVisible flag value.
   */
  const toggleIsCardFormVisible = () => {
    setIsCardFormVisible(!isCardFormVisible);
    toggleIsListDraggable(list);
  };

  const onCreateCard = (card) => {
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
               onCreateCard={onCreateCard}/>;

};

export default ListContainer;