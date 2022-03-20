import {ModalForm} from '../../form/modal-form/ModalForm';
import {useEffect, useRef, useState} from 'react';
import {useInput} from '../../../utils/hooks/input-hook';
import {RequestType, sendRequest} from '../../../utils/http';

export const useCardForm = (isActive, onClose, onSuccess, listId, nextPriority, card) => {

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const previousIsFormSubmittingRef = useRef(isFormSubmitting);
  const title = useInput(card ? card.title : '');
  const isModalActive = !!isActive;

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

    const reset = () => {
      title.setValue('');
    };

    const create = () => {
      sendRequest(RequestType.POST, '/cards', null, {
        title: title.value,
        priority: nextPriority,
        listId: listId,
      }, true)
          .then((response) => {
            setIsFormSubmitting(false);
            onClose();
            onSuccess(response.data.body);
            reset();
          });
    };

    const update = () => {
      sendRequest(RequestType.PUT, '/cards/' + card.id, null, {
        title: title.value,
        priority: card.priority,
        listId: listId,
      }, true)
          .then((response) => {
            setIsFormSubmitting(false);
            onClose();
            onSuccess(response.data.body);
          });
    };

    if (previousIsFormSubmittingRef.current !== isFormSubmitting && isFormSubmitting) {
      if (card) {
        update();
      } else {
        create();
      }
    }
  }, [isFormSubmitting, title, listId, nextPriority, onClose, onSuccess, card]);

  return {
    isModalActive,
    isFormSubmitting,
    submitForm,
    onClose,
    title,
  };

};

export const CardForm = ({isActive, onClose, onSuccess, listId, nextPriority, card}) => {

  const {
    isModalActive,
    isFormSubmitting,
    submitForm,
    title,
  } = useCardForm(isActive, onClose, onSuccess, listId, nextPriority, card);

  return (
      <ModalForm isModalActive={isModalActive}
                 isLoading={isFormSubmitting}
                 typeLabel="Card"
                 isCreate={card == null}
                 onSubmit={submitForm}
                 onClose={onClose}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
                className="input"
                type="text"
                name="title"
                placeholder="Buy groceries"
                {...title.bind} />
          </div>
        </div>
      </ModalForm>
  );

};