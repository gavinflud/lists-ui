import TeamList from './team-list-view';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../app/app-context';
import {RequestType, sendRequest} from '../../../utils/http';

/**
 * Container for the team list screen.
 */
const TeamListContainer = () => {

  const {user} = useContext(AppContext);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  /**
   * Load the teams on first render.
   */
  useEffect(() => {

    /**
     * Get the teams.
     */
    const getTeams = () => {
      sendRequest(RequestType.GET, '/teams', {userId: user.id}, null, true)
          .then((response) => {
            setTeams(response.data.body.content);
          });
    };

    if (user || shouldRefresh) {
      getTeams();
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

  return <TeamList teams={teams}
                   isFormVisible={isFormVisible}
                   toggleIsFormVisible={toggleIsFormVisible}
                   refresh={refresh}/>;

};

export default TeamListContainer;