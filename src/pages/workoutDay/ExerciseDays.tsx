import { useParams } from 'react-router';
import { useGymStore } from '@store/GymStore';
import { CardExercise, CustomButton, Modal } from '@component-IU';
import './ExerciseDaysStyles.css';
import { useOpen } from '../../hook/useOpen';
import { useExerciseForm } from '../../hook/useExerciseForm';

const ExerciseDays = () => {
	const { id } = useParams();
	const { OpenUI, CloseUI, isOpen } = useOpen();
	const workout = useGymStore((state) =>
		state.workouts.find((w) => w._id === id),
	);
	const { saveExercise } = useExerciseForm(workout);

	if (!workout) {
		return <div>Cargando rutina o Dia no encontrado</div>;
	}

	const EXERCISE_LIMIT = 8;
	const canAddExercise = (workout?.exercises.length || 0) >= EXERCISE_LIMIT;

	const handleSaveExercise = async (data: any) => {
		const ok = await saveExercise(data);
		if (ok) CloseUI();
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
							note={exercise.notes}></CardExercise>
					))
				)}
				<CustomButton
					size="small"
					backgroundColor="primary"
					appearance="outline"
					onClick={() => OpenUI()}
					disabled={canAddExercise}>
					Agregar ejercicio
				</CustomButton>
				<Modal
					isOpen={isOpen}
					onClose={() => CloseUI()}
					onSave={handleSaveExercise}
					title="Crear Ejercicio"></Modal>
			</div>
			<div>
				<CustomButton>Guardar Rutina</CustomButton>
			</div>
		</div>
	);
};

export default ExerciseDays;
