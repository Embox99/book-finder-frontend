import "./UpdateProfile.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function UpdateProfile({onClose}) {
  return (
    <ModalWithForm
      isOpen={true}
      title="Update your profile"
      buttonText="Confirm"
      onClose={onClose}
    >
      <label htmlFor="username" className="modal__label">
        <input
          type="text"
          className="modal__input"
          id="username"
          name="name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="email" className="modal__label">
        <input
          type="text"
          className="modal__input"
          id="update-email"
          placeholder="Email"
          name="update-email"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default UpdateProfile;
