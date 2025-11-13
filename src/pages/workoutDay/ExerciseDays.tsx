import "./ExerciseDaysStyles.css";
import CustomButton from "../../component/iu/CustomButton/CustomButton";
import { useGymStore } from "../../store/GymStore";
import CardExercise from "../../component/iu/CardExercise/CardExercise";
import { useParams } from "react-router";
import { updateWorkoutDay } from "../../api/workoutService";
import { useState } from "react";
import ExerciseModal, {
  type ExerciseFormData,
} from "../../component/iu/modal/Modal";
import { useAlertsContext } from "../../context/useContextAlert";
import AlertDisplay from "../../component/iu/AlertsUI/AlertsUI";

const ExerciseDays = () => {
  const { id } = useParams();
  const { addExercise } = useGymStore();
  const { addAlert } = useAlertsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const workout = useGymStore((state) =>
    state.workouts.find((w) => w._id === id),
  );

  if (!workout) {
    return <div>Cargando rutina o Dia no encontrado</div>;
  }

  const dayId = workout._id;

  const EXERCISE_LIMIT = 8;
  const canAddExercise = (workout?.exercises.length || 0) >= EXERCISE_LIMIT;

  const handleSaveExercise = async (formData: ExerciseFormData) => {
    if (!workout) return;
    try {
      const newExercises = [...workout.exercises, formData];

      const updatedDayData = {
        ...workout,
        exercises: newExercises,
      };

      const response = await updateWorkoutDay(dayId, updatedDayData);

      addExercise(
        response.exercises[response.exercises.length - 1],
        workout._id,
      );

      setIsModalOpen(false);
      addAlert("success", "¡Ejercicio guardado exitosamente!");
    } catch (error) {
      console.error("Error al guardar el ejercicio:", error);
      addAlert(
        "error",
        "Hubo un error al guardar el ejercicio. Inténtalo de nuevo.",
      );
    }
  };

  return (
    <div className="workout__container">
      <div className="workout__title-container">
        <h2 className="workout__title">{workout?.dayOfWeek}</h2>
      </div>
      <div className="workout__container-body">
        {workout?.exercises.length === 0 ? (
          <p>Crea tu primera rutina haciendo click en 'Agregar Ejercicio'</p>
        ) : (
          workout?.exercises.map((exercise, index) => (
            <CardExercise
              key={`${exercise._id}-${index}`}
              id={exercise._id}
              name={exercise.name}
              exerciseNumber={index + 1}
              reps={exercise.reps}
              sets={exercise.sets}
              weight={exercise.weightKg}
              note={exercise.notes}
            ></CardExercise>
          ))
        )}
        <CustomButton
          size="small"
          backgroundColor="primary"
          appearance="outline"
          onClick={() => setIsModalOpen(true)}
          disabled={canAddExercise}
        >
          Agregar ejercicio
        </CustomButton>
        <ExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveExercise}
          title="Crear Ejercicio"
        ></ExerciseModal>
      </div>
      <div>
        <CustomButton>Guardar Rutina</CustomButton>
      </div>
      <AlertDisplay />
    </div>
  );
};

export default ExerciseDays;
