import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AppContext} from '../app/app-context';
import {RequestType, sendRequest} from '../../utils/http';
import Team from './team-view';
import Api from '../../utils/api';

/**
 * Container for the team screen.
 */
const TeamContainer = (props) => {

  const {id} = useParams();
  const {user} = useContext(AppContext);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [team, setTeam] = useState({name: ''});
  const [members, setMembers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

    // TODO: Ideally the API could only return boards under a specified team
    const getBoards = () => {
      Api.getBoardsForCurrentUser(user)
          .then(boards => setBoards(boards.filter(board => board.teamId === parseInt(id))));
    };

    if ((user && id) || shouldRefresh) {
      getTeam();
      getMembers();
      getBoards();
      setShouldRefresh(false);
    }
  }, [user, id, shouldRefresh]);

  /**
   * Toggle the isFormVisible flag value.
   */
  const toggleIsFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

  const refresh = () => {
    setShouldRefresh(true);
  };

  return <Team team={team}
               boards={boards}
               members={members}
               isFormVisible={isFormVisible}
               toggleIsFormVisible={toggleIsFormVisible}
               refresh={refresh}/>;

};

export default TeamContainer;