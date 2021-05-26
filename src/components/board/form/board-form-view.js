import ModalForm from '../../form/modal-form';

/**
 * The form view for creating and editing boards.
 */
const BoardForm = (props) => {
  return (
      <ModalForm isModalActive={props.isModalActive}
                 isLoading={props.isLoading}
                 title="Create Board"
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
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input
                className="input"
                type="text"
                name="description"
                placeholder="The best team going..."
                {...props.description.bind} />
          </div>
        </div>
        <div className="field">
          <label className="label">Team</label>
          <div className="control">
            <div className="select">
              <select {...props.team.bind}>
                {props.teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </ModalForm>
  );
};

export default BoardForm;