import {Link} from 'react-router-dom';

/**
 * The form view for creating and editing teams.
 */
const TeamForm = (props) => {
  return (
      <div>
        <section className="section">
          <span className="icon-text">
            <span className="icon is-medium">
              <i className="fa fa-users fa-lg"/>
            </span>
            <span className="title is-4 gf-title-with-icon">Create Team</span>
          </span>

          <div className="gf-below-section-title">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" name="name" value={props.form.name}
                       onChange={props.functions.handleChange} placeholder="My new team"/>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className={'button is-link' + (props.isLoading ? ' is-loading' : '')}
                        onClick={props.functions.submitForm}>
                  Create
                </button>
              </div>
              <div className="control">
                <Link to="/" className="button is-link is-light">Cancel</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default TeamForm;