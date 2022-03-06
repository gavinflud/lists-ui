import './list-form-view.scss';

/**
 * The form view for creating and editing lists.
 */
const ListForm = ({name, isListFormVisible, toggleIsListFormVisible, submitForm}) => {

  const toggleButtonClass = 'gf-list-form-container-button' + (isListFormVisible
      ? ''
      : ' gf-list-form-container-button-visible');

  const listFormClass = 'gf-list-form' + (isListFormVisible
      ? ' gf-list-form-visible'
      : '');

  return (
      <div className="gf-list-draggable gf-list-form-container">
        <button className={toggleButtonClass} onClick={toggleIsListFormVisible}>
          <span className="icon">
            <i className="fas fa-plus"/>
          </span>
          <span>New List</span>
        </button>

        <div className={listFormClass}>
          <div className="field is-grouped">
            <div className="control">
              <input className="input"
                     type="text"
                     name="name"
                     placeholder="Enter list title..."
                     onKeyUp={submitForm}
                     {...name.bind} />
            </div>
            <div className="control">
              <button className="button" onClick={toggleIsListFormVisible}>
                <span className="icon">
                  <i className="fas fa-times"/>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
  );

};

export default ListForm;