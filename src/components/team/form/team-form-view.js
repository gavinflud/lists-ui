import ModalForm from '../../form/modal-form';

/**
 * The form view for creating and editing teams.
 */
const TeamForm = (props) => {

  return (
      <ModalForm isModalActive={props.isModalActive}
                 isLoading={props.isLoading}
                 title="Create Team"
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
                placeholder="My new team"
                {...props.name.bind} />
          </div>
        </div>
      </ModalForm>
  );
};

export default TeamForm;