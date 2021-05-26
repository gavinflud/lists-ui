/**
 * A modal form component for creating or updating data.
 */
const ModalForm = (props) => {

  const modalClass = props.isModalActive ? 'modal is-active' : 'modal';

  return (
      <div>
        <section className={modalClass}>
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{props.title}</p>
            </header>

            <section className="modal-card-body">
              {props.children}
            </section>

            <footer className="modal-card-foot">
              <button className={'button is-success' + (props.isLoading ? ' is-loading' : '')}
                      onClick={props.onSubmit}>{props.submitLabel}
              </button>
              <button className="button" onClick={props.onClose}>{props.closeLabel}</button>
            </footer>
          </div>
        </section>
      </div>
  );

};

export default ModalForm;