import {useContext, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {AppContext} from '../app/app-context';
import {RequestType, sendRequest} from '../../utils/http';
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
  const [recentBoards, setRecentBoards] = useState([]);

  /**
   * Fetch all necessary data once the component mounts.
   */
  useEffect(() => {

    /**
     * Fetch the teams for the current user.
     *
     * TODO: Handle an error response
     */
    const getTeams = () => {
      sendRequest(RequestType.GET, '/teams', {userId: user.id}, null, true)
          .then((response) => {
            setTeams(response.data.body.content.map((item) => {
              return {
                title: item.name,
                link: '/teams/' + item.id,
              };
            }));
          });
    };

    /**
     * Fetch the boards for the current user and populate both the "boards" and "recentBoards" arrays.
     *
     * TODO: Handle an error response
     */
    const getBoards = () => {
      sendRequest(RequestType.GET, '/boards', {userId: user.id}, null, true)
          .then((response) => {
            setBoards(response.data.body.content.map((item) => {
              return {
                title: item.name,
                link: '/boards/' + item.id,
              };
            }));
          });
    };

    if (user || shouldRefresh) {
      getTeams();
      getBoards();
      setShouldRefresh(false);
    }
  }, [user, shouldRefresh]);

  const refresh = () => {
    setShouldRefresh(true);
  };

  // Show a different view depending on if the user is logged in or not
  if (user) {
    return <Home recentBoards={recentBoards}
                 teams={teams}
                 boards={boards}
                 refresh={refresh}/>;
  }

  return <HomeUnauthenticated/>;
};

export default withRouter(HomeContainer);