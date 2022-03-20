const useModalForm = (typeLabel, isCreate, isModalActive, title, submitLabel, closeLabel) => {

  const modalClass = isModalActive ? 'modal is-active' : 'modal';

  const getDefaultTitle = () => {
    return isCreate ? 'Create ' + typeLabel : 'Update ' + typeLabel;
  };

  const getDefaultSubmitLabel = () => {
    return isCreate ? 'Create' : 'Update';
  };

  const getDefaultCloseLabel = () => {
    return 'Cancel';
  };

  const getDefaultLabelOrOverride = (defaultLabel, overrideLabel) => {
    return overrideLabel == null ? defaultLabel : overrideLabel;
  };

  return {
    _title: getDefaultLabelOrOverride(getDefaultTitle(), title),
    _submitLabel: getDefaultLabelOrOverride(getDefaultSubmitLabel(), submitLabel),
    _closeLabel: getDefaultLabelOrOverride(getDefaultCloseLabel(), closeLabel),
    modalClass,
  };

};

/**
 * A modal form component for creating or updating data.
 */
export const ModalForm = ({
  children,
  typeLabel,
  isModalActive,
  isCreate,
  isLoading,
  onSubmit,
  onClose,
  title,
  submitLabel,
  closeLabel,
}) => {

  const {
    _title,
    _submitLabel,
    _closeLabel,
    modalClass,
  } = useModalForm(typeLabel, isCreate, isModalActive, title, submitLabel, closeLabel);

  return (
      <div>
        <section className={modalClass}>
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{_title}</p>
            </header>

            <section className="modal-card-body">
              {children}
            </section>

            <footer className="modal-card-foot">
              <button className={'button is-success' + (isLoading ? ' is-loading' : '')}
                      onClick={onSubmit}>{_submitLabel}
              </button>
              <button className="button" onClick={onClose}>{_closeLabel}</button>
            </footer>
          </div>
        </section>
      </div>
  );

};