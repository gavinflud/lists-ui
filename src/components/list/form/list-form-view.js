import ModalForm from '../../form/modal-form';

/**
 * The form view for creating and editing lists.
 */
const ListForm = props => {

  return (
      <ModalForm isModalActive={props.isModalActive}
                 isLoading={props.isLoading}
                 title="Create List"
                 submitLabel="Create"
                 onSubmit={props.functions.submitForm}
                 closeLabel="Cancel"
                 onClose={props.functions.onClose}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
                className="input"
                type="text"
                name="name"
                placeholder="Todo List"
                {...props.name.bind} />
          </div>
        </div>
      </ModalForm>
  );

};

export default ListForm;