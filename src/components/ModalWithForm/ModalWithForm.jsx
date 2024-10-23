import "./ModalWithForm.css";

function ModalWithForm({ children, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title"></h2>
        <button type="button" className="modal__close-btn" />
        <form className="modal__form">
          {children}
          <div className="modal__buttons-container">
            <button type="submit" className="modal__submit-btn"></button>
            <button type="button" className="modal__redirect-btn"></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
