import { useParams } from 'react-router';
import { Button } from '@component-UI';
import { useGymStore } from '@store/GymStore';
import { deleteExercise } from '../../../api/workoutService';
import { Trash } from 'lucide-react';
import './CardExerciseStyle.css';
import type { WorkoutSet } from '@types';

interface ExerciseProps {
	key: string;
	id?: string;
	name: string;
	exerciseNumber: number;
	sets: WorkoutSet[];
	note?: string;
}

const CardExercise = ({
	key,
	id: exerciseId,
	name,
	exerciseNumber,
	sets,
	note,
}: ExerciseProps) => {
	const { removeExercise } = useGymStore();
	const { id } = useParams();
	const workout = useGymStore((state) =>
		state.workouts.find((w) => w._id === id),
	);

	const handleDeleteExercise = async (dayId: string, exerciseId: string) => {
		if (!dayId || !exerciseId) return;
		try {
			await deleteExercise(dayId, exerciseId);
			removeExercise(dayId, exerciseId);
			console.log(`Ejercicio ${exerciseId} eliminado exitosamente`);
		} catch (error) {
			console.error('Error al eliminar el ejercicio:', error);
		}
	};

	return (
		<div
			className="exercise__card"
			key={key}>
			<div className="exercise__card-header">
				<h2 className="exercise__card-title">Ejercicio {exerciseNumber}</h2>
				<Button
					size="small"
					backgroundColor="danger"
					appearance="ghost"
					onClick={() =>
						handleDeleteExercise(workout?._id || '', exerciseId || '')
					}>
					<Trash />
				</Button>
			</div>
			<div className="exercise__card-body">
				<div className="exercise__name-container">
					<span className="exercise__name">{name}</span>
					<input
						className="exercise__input btn-card"
						placeholder="Cambiar nombre del ejercicio"
						type="text"></input>
				</div>
				<div className="exercise__detail-container">
					<div className="detail-item">
						<span
							id="series"
							className="detail-item__title">
							Series
						</span>
						<input
							id="series"
							className="detail-item__input btn-card"
							type="number"
							placeholder="4"
							min="0"
							value={sets.length}></input>
					</div>
					<div className="detail-item">
						<span
							id="reps"
							className="detail-item__title">
							Reps
						</span>
						<input
							className="detail-item__input btn-card"
							type="text"
							id="reps"
							placeholder="10-12"
							value={sets[0]?.reps ?? 0}
						/>
					</div>
					<div className="detail-item">
						<span
							id="weight"
							className="detail-item__title">
							Peso (kg)
						</span>
						<input
							className="detail-item__input btn-card "
							id="weight"
							type="number"
							value={sets[0]?.weightKg ?? 0}
							min="0"
						/>
					</div>
				</div>
				<div className="exercise__card-note">
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
