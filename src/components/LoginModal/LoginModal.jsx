import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, redirectButtonClick }) {
  return (
    <ModalWithForm
      isOpen={true}
      title="Log in"
      buttonText="Log in"
      redirectButtonText="or Sign Up"
      onClose={onClose}
      redirectButtonClick={redirectButtonClick}
    >
      <label htmlFor="user-email" className="modal__label">
        <input
          type="email"
          className="modal__input"
          id="user-email"
          name="email"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="user-password" className="modal__label">
        <input
          type="password"
          className="modal__input"
          id="user-password"
          name="password"
          placeholder="Password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
