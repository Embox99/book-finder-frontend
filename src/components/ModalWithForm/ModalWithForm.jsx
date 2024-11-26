import "./ModalWithForm.css";
import closeButton from "../../assets/modal-close-button.svg";

function ModalWithForm({
  children,
  isOpen,
  title,
  buttonText,
  redirectButtonText,
  onClose,
  redirectButtonClick,
  onSubmit,
  isValid,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img
            src={closeButton}
            alt="close-btn"
            className="modal__close-btn-img"
          />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons-container">
            <button
              type="submit"
              className={`modal__submit-btn ${
                !isValid ? "modal__submit-disabled" : ""
              }`}
              disabled={`${isValid ? "" : "disabled"}`}
            >
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
