import "./SetGoalModal.css";
import { useState } from "react";

function SetGoalModal({ isOpen, onClose, onSave }) {
  const [goal, setGoal] = useState("");

  const handleSave = () => {
    if (goal > 0) {
      onSave(parseInt(goal, 10));
      onClose();
    } else {
      alert("The goal should be more than 0");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="goal-modal">
      <div className="goal-modal__content">
        <h2 className="goal-modal__title">Set your reading goal</h2>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Set the number"
        />
        <div className="goal-modal__buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default SetGoalModal;
