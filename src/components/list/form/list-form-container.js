import ListForm from './list-form-view';
import {useEffect, useRef, useState} from 'react';
import {useInput} from '../../../utils/hooks/input-hook';
import {RequestType, sendRequest} from '../../../utils/http';

/**
 * List form component. This form allows for lists to be created or updated.
 */
const ListFormContainer = ({board, nextPriority, isActive, onClose, onSuccess}) => {

  const isModalActive = !!isActive;
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

    /**
     * Reset form data to base value.
     */
    const reset = () => {
      name.setValue('');
    };

    if (previousIsFormSubmittingRef.current !== isFormSubmitting && isFormSubmitting) {
      sendRequest(RequestType.POST, '/lists', null, {
        name: name.value,
        priority: nextPriority,
        boardId: board.id,
      }, true)
          .then(() => {
            setIsFormSubmitting(false);
            onClose();
            onSuccess();
            reset();
          });
    }
  }, [isFormSubmitting, name, nextPriority, board, onClose, onSuccess]);

  const functions = {
    submitForm: submitForm,
    onClose: onClose,
  };

  return <ListForm name={name}
                   isModalActive={isModalActive}
                   isLoading={isFormSubmitting}
                   functions={functions}/>;

};

export default ListFormContainer;