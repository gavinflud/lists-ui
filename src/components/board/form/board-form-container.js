import BoardForm from './board-form-view';
import {useInput} from '../../../utils/hooks/input-hook';
import {useContext, useEffect, useRef, useState} from 'react';
import {RequestType, sendRequest} from '../../../utils/http';
import {AppContext} from '../../app/app-context';
import Api from '../../../utils/api';

/**
 * Board form component. This form allows for boards to be created or updated.
 */
const BoardFormContainer = (props) => {

  const {user} = useContext(AppContext);
  const isModalActive = !!props.isActive;
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [teams, setTeams] = useState([]);
  const previousIsFormSubmittingRef = useRef(isFormSubmitting);
  const name = useInput('');
  const description = useInput('');
  const team = useInput();

  /**
   * Try to create/update the team.
   */
  const submitForm = () => {
    setIsFormSubmitting(true);
  };

  /**
   * Fetch all necessary data when the component mounts.
   */
  useEffect(() => {
    if (user) {
      Api.getTeamsForCurrentUser(user)
          .then(setTeams);
    }
  }, [user]);

  /**
   * Update the ID of the team input if it is not populated (after fetching the teams).
   */
  useEffect(() => {
    if (!team.value && teams.length > 0) {
      team.setValue(teams[0].id);
    }
  }, [teams]);

  /**
   * When the form is submitted, send a create/update request.
   *
   * TODO: Handle error in creating team
   * TODO: Handle updating and creating
   */
  useEffect(() => {
    if (previousIsFormSubmittingRef.current !== isFormSubmitting && isFormSubmitting) {
      sendRequest(RequestType.POST, '/boards', null, {
        name: name.value,
        description: description.value,
        teamId: team.value,
      }, true)
          .then(() => {
            setIsFormSubmitting(false);
            props.onClose();
            props.onSuccess();
          });
    }
  }, [isFormSubmitting, name.value, description.value, team.value, props.history]);

  const functions = {
    submitForm: submitForm,
    onClose: props.onClose,
  };

  return <BoardForm name={name}
                    description={description}
                    isModalActive={isModalActive}
                    isLoading={isFormSubmitting}
                    teams={teams}
                    team={team}
                    functions={functions}/>;

};

export default BoardFormContainer;