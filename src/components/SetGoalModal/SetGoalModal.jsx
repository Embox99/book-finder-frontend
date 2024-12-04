import "./SetGoalModal.css";
import { useFormValidation } from "../../utils/useFormValidation";

function SetGoalModal({ isOpen, onClose, onSave }) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSave(parseInt(values.goal, 10));
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <form className="goal-modal" onSubmit={handleSubmit}>
      <div className="goal-modal__content">
        <h2 className="goal-modal__title">Set your reading goal</h2>
        <label htmlFor="goal" className="goal-modal__label">
          <input
            type="number"
            id="goal"
            name="goal"
            value={values.goal || ""}
            onChange={handleChange}
            placeholder="Set the number"
            className="goal-modal__input"
            required
            min="1"
          />
          {errors.goal && (
            <span className="goal-modal__error">{errors.goal}</span>
          )}
        </label>
        <div className="goal-modal__buttons">
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="goal-modal__button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="goal-modal__button goal-modal__button--save"
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default SetGoalModal;
