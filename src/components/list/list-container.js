import List from './list-view';
import {useContext, useState} from 'react';
import {AppContext} from '../app/app-context';

/**
 * Container for the list component.
 */
const ListContainer = ({list, cardMap, orderedCards, toggleIsListDraggable}) => {

  const {user} = useContext(AppContext);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isCardFormVisible, setIsCardFormVisible] = useState(false);

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
               cardMap={cardMap}
               orderedCards={orderedCards}
               isCardFormVisible={isCardFormVisible}
               toggleIsCardFormVisible={toggleIsCardFormVisible}
               refresh={refresh}/>;

};

export default ListContainer;