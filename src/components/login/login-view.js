/**
 * The login form view.
 */
const Login = (props) => {

  const modalClass = props.isModalActive ? 'modal is-active' : 'modal';
  const warningClass = props.isError
      ? 'message is-warning'
      : 'message is-warning is-hidden';

  return (
      <div>
        <span className="button is-light" onClick={props.functions.toggleModal}>Log in</span>

        <div className={modalClass}>
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Log in</p>
            </header>

            <section className="modal-card-body">
              <article className={warningClass}>
                <div className="message-body">
                  That username or password was incorrect.
                </div>
              </article>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="text" name="username"
                         value={props.username}
                         onChange={props.functions.handleChange}/>
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" name="password"
                         value={props.password}
                         onChange={props.functions.handleChange}/>
                </div>
              </div>
            </section>

            <footer className="modal-card-foot">
              <button className="button is-success"
                      onClick={props.functions.submitForm}>Log in
              </button>
              <button className="button"
                      onClick={props.functions.toggleModal}>Cancel
              </button>
            </footer>
          </div>
          <button className="modal-close is-large" aria-label="close"
                  onClick={props.functions.toggleModal}/>
        </div>
      </div>
  );

};

export default Login;