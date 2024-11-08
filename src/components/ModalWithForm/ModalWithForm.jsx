import "./ModalWithForm.css";

function ModalWithForm({
  children,
  isOpen,
  title,
  buttonText,
  redirectButtonText,
  onClose,
  redirectButtonClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn" onClick={onClose}>
          ×
        </button>
        <form className="modal__form">
          {children}
          <div className="modal__buttons-container">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__redirect-btn"
              onClick={redirectButtonClick}
            >
              {redirectButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
