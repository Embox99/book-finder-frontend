import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "../../utils/useFormValidation";

function LoginModal({ onClose, redirectButtonClick, handleLogIn }) {
  const navigate = useNavigate();
  const { values, handleChange, isValid, resetForm } = useFormValidation();

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogIn(values, resetCurrentForm)
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <ModalWithForm
      isOpen={true}
      title="Log in"
      buttonText="Log in"
      redirectButtonText="or Sign Up"
      onClose={onClose}
      redirectButtonClick={redirectButtonClick}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="user-email" className="modal__label">
        <input
          type="email"
          className="modal__input"
          id="user-email"
          name="email"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
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
          value={values.password || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
