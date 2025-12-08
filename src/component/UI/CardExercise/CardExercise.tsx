import { useParams } from 'react-router';
import { CustomButton } from '@component-UI';
import { useGymStore } from '@store/GymStore';
import { deleteExercise } from '../../../api/workoutService';
import { Trash } from 'lucide-react';
import './CardExerciseStyle.css';

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
					<div className="exercise__card-set-card">
						{/*-- Indicador de series --*/}
						<div className="exercise__card-set-number">{exerciseNumber}</div>

						{/*-- Campos editables --*/}
						<div className="exercise__card_content">
							<div className="exercise__card_input-group">
								<label className="exercise__card-label">Series</label>
								<input className="exercise__card-input"></input>
							</div>
							<div className="exercise__card_input-group">
								<label className="exercise__card-label">Reps</label>
								<input className="exercise__card-input"></input>
							</div>

							<div className="exercise__card_input-group">
								<label className="exercise__card-label">Peso(kg)</label>
								<input className="exercise__card-input"></input>
							</div>

							<CustomButton
								size="small"
								backgroundColor="danger"
								appearance="ghost">
								<Trash />
							</CustomButton>
							{/*-- Acciones --*/}
						</div>
					</div>
				</div>
				<div className="card__exercise-add-set">
					<CustomButton
						appearance="outline"
						backgroundColor="primary"
						size="large">
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
