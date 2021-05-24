import TeamList from './team-list-view';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../app/app-context';
import {RequestType, sendRequest} from '../../../utils/http';

/**
 * Container for the team list screen.
 */
const TeamListContainer = () => {

  const {user} = useContext(AppContext);
  const [teams, setTeams] = useState([]);

  /**
   * Load the teams on first render.
   */
  useEffect(() => {
    if (user) {
      getTeams();
    }
  }, [user]);

  /**
   * Get the teams.
   */
  const getTeams = () => {
    sendRequest(RequestType.GET, '/teams', {userId: user.id}, null, true)
        .then((response) => {
          setTeams(response.data.body.content);
        });
  };

  return <TeamList teams={teams}/>;

};

export default TeamListContainer;