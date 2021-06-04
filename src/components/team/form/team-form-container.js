import {useEffect, useRef, useState} from 'react';
import TeamForm from './team-form-view';
import {RequestType, sendRequest} from '../../../utils/http';
import {useInput} from '../../../utils/hooks/input-hook';

/**
 * Team form component. This form allows for teams to be created or updated.
 */
const TeamFormContainer = (props) => {

  const isModalActive = !!props.isActive;
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const previousIsFormSubmittingRef = useRef(isFormSubmitting);
  const name = useInput('');

  /**
   * Try to create/update the team.
   */
  const submitForm = () => {
    setIsFormSubmitting(true);
  };

  /**
   * When the form is submitted, send a create/update request.
   *
   * TODO: Handle error in creating team
   * TODO: Handle updating and creating
   */
  useEffect(() => {
    if (previousIsFormSubmittingRef.current !== isFormSubmitting && isFormSubmitting) {
      sendRequest(RequestType.POST, '/teams', null, {name: name.value}, true)
          .then(() => {
            setIsFormSubmitting(false);
            props.onClose();
            props.onSuccess();
          });
    }
  }, [isFormSubmitting, name.value, props.history]);

  const functions = {
    submitForm: submitForm,
    onClose: props.onClose,
  };

  return <TeamForm name={name}
                   isModalActive={isModalActive}
                   isLoading={isFormSubmitting}
                   functions={functions}/>;
};

export default TeamFormContainer;