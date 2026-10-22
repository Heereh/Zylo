import { useGymStore } from '@store/GymStore';
import {
	addExerciseToWorkoutDay,
	updateExerciseInWorkoutDay,
} from '../api/workoutService';
import type { DayWorkout, Exercise, ExerciseFormData } from '@types';

export const useExerciseForm = (
	workout:
		| {
				_id: string;
				exercises: Exercise[];
		  }
		| undefined,
) => {
	const { setWorkouts, workouts } = useGymStore();

	const saveExercise = async (data: ExerciseFormData) => {
		if (!workout) return false;

		try {
			if (data.sets < 1 || data.reps < 1 || data.weightKg < 0) {
				throw new Error(
					'Las series y repeticiones deben ser mayores que cero y el peso no puede ser negativo.',
				);
			}
			const exercise: Exercise = {
				_id: data._id,
				exerciseId: data.exerciseId,
				name: data.name.trim(),
				notes: data.notes.trim() || undefined,
				sets: Array.from({ length: data.sets }, () => ({
					reps: data.reps,
					weightKg: data.weightKg,
					completed: false,
				})),
			};
			const updated = data._id
				? await updateExerciseInWorkoutDay(
						workout._id,
						workout.exercises,
						data._id,
						exercise,
					)
				: await addExerciseToWorkoutDay(
						workout._id,
						workout.exercises,
						exercise,
					);

			setWorkouts(
				workouts.map((item) =>
					item._id === workout._id ? (updated as DayWorkout) : item,
				),
			);

			alert('¡Ejercicio guardado exitosamente!');
			return true;
		} catch (error) {
			console.error('Error al guardar el ejercicio:', error);
			alert('Hubo un error al guardar el ejercicio. Inténtalo de nuevo.');
			return false;
		}
	};
	return { saveExercise };
};
