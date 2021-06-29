import {useContext, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {AppContext} from '../app/app-context';
import Api from '../../utils/api';
import Home from './home-view';
import HomeUnauthenticated from './home-unauthenticated-view';

/**
 * Container for the home screen.
 */
const HomeContainer = (props) => {

  const {user} = useContext(AppContext);

  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [teams, setTeams] = useState([]);
  const [boards, setBoards] = useState([]);
  const [pinnedBoards, setPinnedBoards] = useState([]);

  /**
   * Fetch all necessary data once the component mounts.
   */
  useEffect(() => {

    const getTeams = () => {
      Api.getTeamsForCurrentUser(user)
          .then(teams => setTeams(teams.map(team => {
            return {
              title: team.name,
              link: '/teams/' + team.id,
            };
          })));
    };

    const getBoards = () => {
      Api.getBoardsForCurrentUser(user)
          .then(boards => setBoards(boards.map(board => {
            return {
              title: board.name,
              link: '/boards/' + board.id,
            };
          })));
    };

    if (user || shouldRefresh) {
      getTeams();
      getBoards();
      setShouldRefresh(false);
    }
  }, [user, shouldRefresh]);

  // TODO: This is only temporary until we track board views
  useEffect(() => {
    setPinnedBoards(boards);
  }, [boards]);

  const refresh = () => {
    setShouldRefresh(true);
  };

  // Show a different view depending on if the user is logged in or not
  if (user) {
    return <Home pinnedBoards={pinnedBoards}
                 teams={teams}
                 boards={boards}
                 refresh={refresh}/>;
  }

  return <HomeUnauthenticated/>;
};

export default withRouter(HomeContainer);