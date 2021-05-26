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
  const [members, setMembers] = useState([]);

  /**
   * Load the team on first render.
   */
  useEffect(() => {

    const getTeam = () => {
      sendRequest(RequestType.GET, '/teams/' + id, null, null, true)
          .then((response) => setTeam(response.data.body));
    };

    const getMembers = () => {
      sendRequest(RequestType.GET, '/teams/' + id + '/members', null, null, true)
          .then((response) => setMembers(response.data.body));
    };

    if (user && id) {
      getTeam();
      getMembers();
    }
  }, [user]);

  return <Team team={team}
               members={members}/>;

};

export default TeamContainer;