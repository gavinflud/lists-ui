import ModalForm from '../../form/modal-form';

/**
 * The form view for creating and editing cards.
 */
const CardForm = props => {

  return (
      <ModalForm isModalActive={props.isModalActive}
                 isLoading={props.isLoading}
                 title="Create Card"
                 submitLabel="Create"
                 onSubmit={props.functions.submitForm}
                 closeLabel="Cancel"
                 onClose={props.functions.onClose}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
                className="input"
                type="text"
                name="title"
                placeholder="Buy groceries"
                {...props.title.bind} />
          </div>
        </div>
      </ModalForm>
  );

};

export default CardForm;