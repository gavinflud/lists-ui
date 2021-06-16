import List from './list-view';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../app/app-context';
import Api from '../../utils/api';

/**
 * Container for the list component.
 */
const ListContainer = ({list, toggleIsListDraggable}) => {

  const {user} = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isCardFormVisible, setIsCardFormVisible] = useState(false);

  /**
   * Load the board on first render.
   */
  useEffect(() => {

    const getCards = () => {
      Api.getCardsForList(list.id)
          .then(cards => {
            // Adding this property allows us to later prevent dragging on certain interactions
            cards.forEach(card => card.isDraggable = true);
            setCards(cards.sort((a, b) => a.priority - b.priority));
          });
    };

    if (user || shouldRefresh) {
      getCards();
      setShouldRefresh(false);
    }
  }, [user, shouldRefresh]);

  /**
   * Toggle the isFormVisible flag value.
   */
  const toggleIsCardFormVisible = () => {
    setIsCardFormVisible(!isCardFormVisible);
    toggleIsListDraggable(list);
  };

  const refresh = () => {
    setShouldRefresh(true);
  };

  return <List list={list}
               cards={cards}
               isCardFormVisible={isCardFormVisible}
               toggleIsCardFormVisible={toggleIsCardFormVisible}
               refresh={refresh}/>;

};

export default ListContainer;