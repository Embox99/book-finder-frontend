import "./RegistrationModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegistrationModal({ onClose, redirectButtonClick }) {
  return (
    <ModalWithForm
      isOpen={true}
      title="Sign up"
      buttonText="Sign up"
      redirectButtonText="or Log in"
      onClose={onClose}
      redirectButtonClick={redirectButtonClick}
    >
      <label htmlFor="email" className="modal__label">
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="date-of-birth" className="modal__label">
        <input
          type="number"
          className="modal__input"
          id="date-of-birth"
          placeholder="Date of birth"
          name="date-of-birth"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegistrationModal;
