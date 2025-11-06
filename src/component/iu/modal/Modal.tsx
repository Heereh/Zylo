import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import CustomButton from "../CustomButton/CustomButton";
import "./modalStyles.css";
import { type ExerciseTypes } from "../../../store/GymStore";

export type ExerciseFormData = Omit<ExerciseTypes, "id">;

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExerciseFormData) => void;
  initialData?: ExerciseFormData;
  title: string;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}) => {
  const defaultExercise: ExerciseFormData = {
    _id: "",
    name: "",
    sets: 3,
    reps: "10-12",
    weightKg: 10,
    notes: "",
  };

  const [formData, setFormData] = useState<ExerciseFormData>(
    initialData || defaultExercise,
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || defaultExercise);
    }
  }, [isOpen, initialData]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">Nombre del Ejercicio</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="sets">Series</label>
                <input
                  type="number"
                  id="sets"
                  name="sets"
                  value={formData.sets}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reps">Repeticiones</label>
                <input
                  type="text"
                  id="reps"
                  name="reps"
                  value={formData.reps}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="weightKg">Peso (kg)</label>
              <input
                type="number"
                id="weightKg"
                name="weightKg"
                value={formData.weightKg}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Nota</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <CustomButton appearance="outline" onClick={onClose} type="button">
              Cancelar
            </CustomButton>
            <CustomButton backgroundColor="primary" type="submit">
              Guardar
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseModal;
