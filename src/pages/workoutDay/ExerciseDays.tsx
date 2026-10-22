import { useNavigate, useParams } from 'react-router';
import { useGymStore } from '@store/GymStore';
import { Button, Modal } from '@component-UI';
import './ExerciseDaysStyles.css';
import { useOpen } from '../../hook/useOpen';
import { useExerciseForm } from '../../hook/useExerciseForm';
import type { Exercise, ExerciseFormData } from '@types';
import { ExerciseList } from '@component/UI/NewCards/ExerciseList';
import { ExerciseCard } from '@component/UI/NewCards/ExerciseCard';
import { deleteExercise, deleteWorkoutDay } from '../../api/workoutService';
import { TrashIcon } from 'lucide-react';

const ExerciseDays = () => {
	const { id } = useParams();
	const { OpenUI, CloseUI, isOpen } = useOpen();
	const workout = useGymStore((state) =>
		state.workouts.find((w) => w._id === id),
	);
	const { saveExercise } = useExerciseForm(workout);
	const navigate = useNavigate();

	if (!workout) {
		return <div>Cargando rutina o Dia no encontrado</div>;
	}

	const EXERCISE_LIMIT = 8;
	const limitReached = workout.exercises.length >= EXERCISE_LIMIT;

	// Modal "Crear ejercicio": cierra solo si se guardó
	const handleCreateExercise = async (data: ExerciseFormData) => {
		const ok = await saveExercise(data);
		if (ok) CloseUI();
	};

	// Tarjeta: devuelve el resultado para que muestre el error si falla
	const handleUpdateExercise = (data: ExerciseFormData) => saveExercise(data);

	const handleDeleteExercise = async (exercise: Exercise): Promise<boolean> => {
		const { _id: exerciseId } = exercise;
		const dayId = workout._id;
		if (!dayId || !exerciseId) return false;

		try {
			await deleteExercise(dayId, exerciseId);
			useGymStore.getState().removeExercise(dayId, exerciseId);
			return true;
		} catch {
			console.error('Error al eliminar el ejercicio:', exerciseId);
			return false;
		}
	};

	const handleDeleteWorkoutDay = async (
		workoutId: string,
	): Promise<boolean> => {
		try {
			await deleteWorkoutDay(workoutId);
			useGymStore.getState().removeWorkoutDay(workoutId);
			navigate('/');
			return true;
		} catch {
			console.error('Error al eliminar el día de entrenamiento:', workoutId);
			return false;
		}
	};

	return (
		<div className="workout__container">
			<div className="workout__title-container">
				<h2 className="workout__title">{workout?.dayOfWeek}</h2>
				<div className="btn__container">
					<Button
						size="small"
						backgroundColor="danger"
						appearance="ghost"
						icon={<TrashIcon />}
						iconOnly
						aria-label={`Eliminar día ${workout?.dayOfWeek}`}
						onClick={() => handleDeleteWorkoutDay(workout._id)}></Button>
					<Button
						size="small"
						backgroundColor="primary"
						appearance="solid"
						onClick={() => OpenUI()}
						disabled={limitReached}>
						Agregar ejercicio
					</Button>
				</div>
			</div>
			<div className="workout__container-body">
				{workout.exercises.length === 0 ? (
					<div className="zy-empty">
						<p className="zy-empty__title">Este día no tiene ejercicios</p>
						<p className="zy-empty__text">
							Agrega el primero con «Agregar ejercicio» para empezar a
							planificar.
						</p>
					</div>
				) : (
					<ExerciseList>
						{workout.exercises.map((exercise, index) => (
							<ExerciseCard
								key={`${exercise._id}-${index}`}
								exercise={exercise}
								onSave={handleUpdateExercise}
								onDelete={() => handleDeleteExercise(exercise)}
							/>
						))}
					</ExerciseList>
				)}
				{limitReached && (
					<p className="zy-limit-hint">
						Llegaste al límite de {EXERCISE_LIMIT} ejercicios por día.
					</p>
				)}
				<Modal
					isOpen={isOpen}
					onClose={() => CloseUI()}
					onSave={handleCreateExercise}
					title="Crear Ejercicio"></Modal>
			</div>
		</div>
	);
};

export default ExerciseDays;
