import BoardList from './board-list-view';
import {AppContext} from '../../app/app-context';
import Api from '../../../utils/api';
import {useContext, useEffect, useState} from 'react';

/**
 * Container for the board list screen.
 */
const BoardListContainer = () => {

  const {user} = useContext(AppContext);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  /**
   * Load the boards on first render.
   */
  useEffect(() => {
    if (user || shouldRefresh) {
      Api.getBoardsForCurrentUser(user)
          .then(setBoards);
      setShouldRefresh(false);
    }
  }, [user, shouldRefresh]);

  /**
   * Toggle the isFormVisible flag value.
   */
  const toggleIsFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

  const refresh = () => {
    setShouldRefresh(true);
  };

  return <BoardList boards={boards}
                    isFormVisible={isFormVisible}
                    toggleIsFormVisible={toggleIsFormVisible}
                    refresh={refresh}/>;

};

export default BoardListContainer;