import { useParams } from 'react-router';
import { CustomButton } from '@component-UI';
import { useGymStore } from '@store/GymStore';
import { deleteExercise } from '../../../api/workoutService';
import './CardExerciseStyle.css';
import ListSeries from './ListSeries';

interface ExerciseProps {
	key: string;
	id: string;
	name: string;

	note: string;
}

const CardExercise = ({ key, id: exerciseId, name, note }: ExerciseProps) => {
	const { addSeries, removeExercise } = useGymStore();
	const { id } = useParams();
	const workout = useGymStore((state) =>
		state.workouts.find((w) => w._id === id),
	);
	const exercise = useGymStore((state) =>
		state.workouts
			.find((w) => w._id === id)
			?.exercises.find((ex) => ex._id === exerciseId),
	);

	const handleCreateSeries = () => {
		if (id && exerciseId) {
			addSeries(id, exerciseId);
		}
	};

	const handleDeleteExercise = async (dayId: string, exerciseId: string) => {
		if (!dayId) return;
		try {
			await deleteExercise(dayId, exerciseId);
			removeExercise(dayId, exerciseId);
			console.log(`Ejercicio ${exerciseId} eliminado exitosamente`);
		} catch (error) {
			console.error('Error al eliminar el ejercicio:', error);
			alert('Hubo un error al eliminar el ejercicio. Inténtalo de nuevo.');
		}
	};
	return (
		<div
			className="exercise__card"
			key={key}>
			<div className="exercise__card-header">
				<span className="exercise__card-title">{name}</span>
			</div>
			<div className="exercise__card-body">
				<div className="exercise__card-sets-container">
					<h5>Sets de entrenamientos</h5>
					<ListSeries series={exercise?.series || []}></ListSeries>
					
				</div>
				<div className="card__exercise-add-set">
					<CustomButton
						appearance="outline"
						backgroundColor="primary"
						size="large"
						onClick={handleCreateSeries}>
						Añadir nueva serie
					</CustomButton>
				</div>

				<div className="card__exercise-note">
					<h2>Nota personal</h2>
					<textarea
						className="card__exercise-textarea"
						placeholder="Añade cualquier observación sobre el rendimiento, dolor o sensaciones."
						defaultValue={note}></textarea>
				</div>
			</div>
		</div>
	);
};

export default CardExercise;
