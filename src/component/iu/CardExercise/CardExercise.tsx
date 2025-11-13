import CustomButton from "../CustomButton/CustomButton";
import { Trash } from "lucide-react";
import "./CardExericseStyle.css";
import { useGymStore } from "../../../store/GymStore";
import { useParams } from "react-router";
import { deleteExercise } from "../../../api/workoutService";
import { useAlertsContext } from "../../../context/useContextAlert";

interface ExerciseProps {
  key: string;
  id: string;
  name: string;
  exerciseNumber: number;
  reps: string;
  weight: number;
  sets: number;
  note: string;
}

const CardExercise = ({
  key,
  id: exerciseId,
  name,
  exerciseNumber,
  sets,
  reps,
  weight,
  note,
}: ExerciseProps) => {
  const { removeExercise } = useGymStore();
  const { id } = useParams();
  const workout = useGymStore((state) =>
    state.workouts.find((w) => w._id === id),
  );
  const { addAlert } = useAlertsContext();

  const handleDeleteExercise = async (dayId: string, exerciseId: string) => {
    if (!dayId) return;
    try {
      await deleteExercise(dayId, exerciseId);
      removeExercise(dayId, exerciseId);
      addAlert("success", `Ejercicio eliminado exitosamente`);
    } catch (error) {
      addAlert(
        "success",
        "Hubo un error al eliminar el ejercicio. Inténtalo de nuevo.",
      );
    }
  };

  return (
    <div className="workout__card" key={key}>
      <div className="workout__card-header">
        <h2 className="workout__card-title">Ejercicio {exerciseNumber}</h2>
        <CustomButton
          size="small"
          backgroundColor="danger"
          appearance="ghost"
          onClick={() => handleDeleteExercise(workout?._id || "", exerciseId)}
        >
          <Trash />
        </CustomButton>
      </div>
      <div className="workout__card-body">
        <div className="exercise__name-container">
          <span className="exercise__name">{name}</span>
          <input
            className="exercise__input btn-card"
            placeholder="Cambiar nombre del ejercicio"
            type="text"
          ></input>
        </div>
        <div className="exercise__detail-container">
          <div className="detail-item">
            <span id="series" className="detail-item__title">
              Series
            </span>
            <input
              id="series"
              className="detail-item__input btn-card"
              type="number"
              placeholder="4"
              min="0"
              value={sets}
            ></input>
          </div>
          <div className="detail-item">
            <span id="reps" className="detail-item__title">
              Reps
            </span>
            <input
              className="detail-item__input btn-card"
              type="text"
              id="reps"
              placeholder="10-12"
              value={reps}
            />
          </div>
          <div className="detail-item">
            <span id="weight" className="detail-item__title">
              Peso (kg)
            </span>
            <input
              className="detail-item__input btn-card "
              id="weight"
              type="number"
              value={weight}
              min="0"
            />
          </div>
        </div>
        <div className="workout__card-note">
          <span className="card-note">Nota</span>
          <input
            className="card-note-input btn-card"
            type="text"
            placeholder="Escribe una nota"
            value={note}
          />
        </div>
      </div>
    </div>
  );
};

export default CardExercise;
