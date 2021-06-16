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
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
                className="textarea"
                name="description"
                placeholder="Remember to get lemons"
                {...props.description.bind} />
          </div>
        </div>
        <div className="field">
          <label className="label">Date</label>
          <div className="control">
            <input
                className="input"
                type="text"
                name="dueDate"
                placeholder="2021-06-21"
                {...props.dueDate.bind} />
          </div>
        </div>
      </ModalForm>
  );

};

export default CardForm;