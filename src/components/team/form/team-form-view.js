/**
 * The form view for creating and editing teams.
 */
const TeamForm = (props) => {

  const modalClass = props.isModalActive ? 'modal is-active' : 'modal';

  return (
      <div>
        <section className={modalClass}>
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Create Team</p>
            </header>

            <section className="modal-card-body">
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
            </section>

            <footer className="modal-card-foot">
              <button className={'button is-success' + (props.isLoading ? ' is-loading' : '')}
                      onClick={props.functions.submitForm}>Create
              </button>
              <button className="button" onClick={props.functions.onClose}>Cancel</button>
            </footer>
          </div>
        </section>
      </div>
  );
};

export default TeamForm;