import "./RegistrationModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormValidation } from "../../utils/useFormValidation";

function RegistrationModal({
  onClose,
  redirectButtonClick,
  handleRegistration,
}) {
  const { values, handleChange, isValid, resetForm } = useFormValidation();

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "", name: "", avatarUrl: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        yearOfBirth: values.yearOfBirth,
      },
      resetCurrentForm
    );
  };
  return (
    <ModalWithForm
      isOpen={true}
      title="Sign up"
      buttonText="Sign up"
      redirectButtonText="or Log in"
      onClose={onClose}
      redirectButtonClick={redirectButtonClick}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email || ""}
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
          onChange={handleChange}
          value={values.password || ""}
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
          onChange={handleChange}
          value={values.name || ""}
        />
      </label>
      <label htmlFor="date-of-birth" className="modal__label">
        <input
          type="number"
          className="modal__input"
          id="yearOfBirth"
          placeholder="Year of birth"
          name="yearOfBirth"
          required
          onChange={handleChange}
          value={values.yearOfBirth || ""}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegistrationModal;
