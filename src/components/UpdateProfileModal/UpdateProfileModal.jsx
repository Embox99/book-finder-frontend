import { useContext, useEffect } from "react";
import "./UpdateProfile.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../utils/useFormValidation";

function UpdateProfile({ onClose, handleUpdateUser }) {
  const { userData } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, setValues, resetForm } =
    useFormValidation();

  useEffect(() => {
    if (userData) {
      setValues({
        name: userData.name || "",
        email: userData.email || "",
      });
    }
  }, [userData, setValues]);

  const resetCurrentForm = () => {
    resetForm({ username: "", email: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values, resetCurrentForm);
  };

  return (
    <ModalWithForm
      isOpen={true}
      title="Update your profile"
      buttonText="Confirm"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="username" className="modal__label">
        <input
          type="text"
          className="modal__input"
          id="username"
          name="name"
          placeholder="Name"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email" className="modal__label">
        <input
          type="text"
          className="modal__input"
          id="update-email"
          placeholder="Email"
          name="email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default UpdateProfile;
