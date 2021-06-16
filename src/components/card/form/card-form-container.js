import CardForm from './card-form-view';
import {useEffect, useRef, useState} from 'react';
import {useInput} from '../../../utils/hooks/input-hook';
import {RequestType, sendRequest} from '../../../utils/http';

/**
 * Card form component. This form allows for cards to be created or updated.
 */
const CardFormContainer = props => {

  const {list, nextPriority} = props;
  const isModalActive = !!props.isActive;
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const previousIsFormSubmittingRef = useRef(isFormSubmitting);
  const title = useInput('');

  /**
   * Try to create/update the card.
   */
  const submitForm = () => {
    setIsFormSubmitting(true);
  };

  /**
   * When the form is submitted, send a create/update request.
   *
   * TODO: Handle error in creating card
   * TODO: Handle updating and creating
   */
  useEffect(() => {

    /**
     * Reset form data to base value.
     */
    const reset = () => {
      title.setValue('');
    };

    if (previousIsFormSubmittingRef.current !== isFormSubmitting && isFormSubmitting) {
      sendRequest(RequestType.POST, '/cards', null, {
        title: title.value,
        priority: nextPriority,
        listId: list.id,
      }, true)
          .then(() => {
            setIsFormSubmitting(false);
            props.onClose();
            props.onSuccess();
            reset();
          });
    }
  }, [isFormSubmitting, title, list.id, nextPriority, props]);

  const functions = {
    submitForm: submitForm,
    onClose: props.onClose,
  };

  return <CardForm title={title}
                   isModalActive={isModalActive}
                   isLoading={isFormSubmitting}
                   functions={functions}/>;

};

export default CardFormContainer;