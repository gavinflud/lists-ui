import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AppContext} from '../app/app-context';
import {RequestType, sendRequest} from '../../utils/http';
import Team from './team-view';

/**
 * Container for the team screen.
 */
const TeamContainer = (props) => {

  const {id} = useParams();
  const {user} = useContext(AppContext);
  const [team, setTeam] = useState({name: ''});

  /**
   * Load the team on first render.
   */
  useEffect(() => {
    if (user && id) {
      getTeam();
    }
  }, [user]);

  /**
   * Get the team.
   */
  const getTeam = () => {
    sendRequest(RequestType.GET, '/teams/' + id, null, null, true)
        .then((response) => {
          setTeam(response.data.body);
        });
  };

  return <Team team={team}/>;

};

export default TeamContainer;