import {ModalForm} from '../../form/modal-form/ModalForm';

/**
 * The form view for creating and editing teams.
 */
const TeamForm = (props) => {

  return (
      <ModalForm typeLabel="Team"
                 isCreate={true}
                 isModalActive={props.isModalActive}
                 isLoading={props.isLoading}
                 onSubmit={props.functions.submitForm}
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