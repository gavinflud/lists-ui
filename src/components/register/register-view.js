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
                  <RegisterInput name="firstName"
                                 type="text"
                                 placeholder="Joe"
                                 label="First Name"
                                 getValidationError={props.functions.getValidationError}
                                 {...props.firstName.bind} />
                </div>
                <div className="column">
                  <RegisterInput name="lastName"
                                 type="text"
                                 placeholder="Bloggs"
                                 label="Last Name"
                                 getValidationError={props.functions.getValidationError}
                                 {...props.lastName.bind} />
                </div>
              </div>
              <RegisterInput name="username"
                             type="text"
                             placeholder="jbloggs@test.com"
                             label="Email"
                             icon="fa-envelope"
                             getValidationError={props.functions.getValidationError}
                             {...props.username.bind} />

              <RegisterInput name="password"
                             type="password"
                             label="Password"
                             icon="fa-lock"
                             getValidationError={props.functions.getValidationError}
                             {...props.password.bind} />

              <RegisterInput name="retypedPassword"
                             type="password"
                             label="Repeat Password"
                             icon="fa-lock"
                             getValidationError={props.functions.getValidationError}
                             {...props.retypedPassword.bind} />
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