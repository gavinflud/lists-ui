import ListForm from './list-form-view';
import {useEffect, useRef, useState} from 'react';
import {useInput} from '../../../utils/hooks/input-hook';
import {RequestType, sendRequest} from '../../../utils/http';

const ListFormContainer = props => {

  const {board} = props;
  const {nextPriority} = props;
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
   * Reset form data to base value.
   */
  const reset = () => {
    name.setValue('');
  };

  /**
   * When the form is submitted, send a create/update request.
   *
   * TODO: Handle error in creating team
   * TODO: Handle updating and creating
   */
  useEffect(() => {
    if (previousIsFormSubmittingRef.current !== isFormSubmitting && isFormSubmitting) {
      sendRequest(RequestType.POST, '/lists', null, {
        name: name.value,
        priority: nextPriority,
        boardId: board.id,
      }, true)
          .then(() => {
            setIsFormSubmitting(false);
            props.onClose();
            props.onSuccess();
            reset();
          });
    }
  }, [isFormSubmitting, name.value, board, props]);

  const functions = {
    submitForm: submitForm,
    onClose: props.onClose,
  };

  return <ListForm name={name}
                   isModalActive={isModalActive}
                   isLoading={isFormSubmitting}
                   functions={functions}/>;

};

export default ListFormContainer;