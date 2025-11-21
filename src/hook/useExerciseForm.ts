import { useGymStore } from "@store/GymStore";
import { updateWorkoutDay } from "../api/workoutService";

export const useExerciseForm = (workout: any) => {
	const {addExercise} = useGymStore()

  const saveExercise = async (data:any) => {
      if (!workout) return;

      try {
        const updated = await updateWorkoutDay(workout._id, {
          ...workout,
          exercises: [...workout.exercises, data],
        })

        addExercise(
          updated.exercises[updated.exercises.length - 1],
          workout._id,
        );
  
        alert('¡Ejercicio guardado exitosamente!');
        return true
      } catch (error) {
        console.error('Error al guardar el ejercicio:', error);
        alert('Hubo un error al guardar el ejercicio. Inténtalo de nuevo.');
        return false
      }
    };
    return {saveExercise}
}