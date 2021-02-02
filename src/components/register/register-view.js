import RegisterInput from './register-input/';

/**
 * The register form view.
 */
const Register = (props) => {

  const modalClass = props.isModalActive ? 'modal is-active' : 'modal';

  return (
      <div>
        <span className="button is-link" onClick={props.functions.toggleModal}><strong>Sign up</strong></span>

        <div className={modalClass}>
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Sign Up</p>
            </header>

            <section className="modal-card-body">
              <div className="columns">
                <div className="column">
                  <RegisterInput name="firstName" label="First Name" functions={props.functions} type="text"
                                 value={props.form.firstName} placeholder="Joe"/>
                </div>
                <div className="column">
                  <RegisterInput name="lastName" label="Last Name" functions={props.functions} type="text"
                                 value={props.form.lastName} placeholder="Bloggs"/>
                </div>
              </div>
              <RegisterInput name="username" label="Email" functions={props.functions} type="text"
                             value={props.form.username} placeholder="jbloggs@test.com" icon="fa-envelope"/>

              <RegisterInput name="password" label="Password" functions={props.functions} type="password"
                             value={props.form.password} icon="fa-lock"/>

              <RegisterInput name="retypedPassword" label="Repeat Password" functions={props.functions} type="password"
                             value={props.form.retypedPassword} icon="fa-lock"/>
            </section>

            <footer className="modal-card-foot">
              <button className={'button is-success' + (props.isLoading ? ' is-loading' : '')}
                      onClick={props.functions.submitForm}>Sign Up
              </button>
              <button className="button" onClick={props.functions.toggleModal}>Cancel</button>
            </footer>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={props.functions.toggleModal}/>
        </div>
      </div>
  );
};

export default Register;