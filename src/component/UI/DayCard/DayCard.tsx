import { Link } from 'react-router';
import { CheckIcon, ChevronRightIcon, PlusIcon } from '../../../assets/Icons';
import type { DayWorkout } from '@types';
import './DayCard.css';

const PREVIEW_COUNT = 3;

export type DayCardProps = {
	workout: DayWorkout;
	/** Ruta a la que navega la tarjeta (la tarjeta completa es el link). */
	to: string;
	isToday?: boolean;
};

export function DayCard({ workout, to, isToday = false }: DayCardProps) {
	const { exercises } = workout;
	const count = exercises.length;
	const empty = count === 0;
	const totalSets = exercises.reduce((sum, e) => sum + e.sets.length, 0);
	const extra = count - PREVIEW_COUNT;
	const preview =
		exercises
			.slice(0, PREVIEW_COUNT)
			.map((e) => e.name)
			.join(', ') + (extra > 0 ? ` y ${extra} más` : '');

	return (
		<Link
			to={to}
			className="zy-day"
			data-empty={empty}
			data-today={isToday || undefined}>
			<span className="zy-day__head">
				<span className="zy-day__name">{workout.dayOfWeek}</span>
				{isToday && <span className="zy-day__tag">Hoy</span>}
				{workout.completed && (
					<span className="zy-day__done">
						<CheckIcon /> Completado
					</span>
				)}
				<ChevronRightIcon className="zy-day__chevron" />
			</span>

			{workout.workoutName && (
				<span className="zy-day__routine">{workout.workoutName}</span>
			)}

			{empty ? (
				<>
					<span className="zy-day__counts">Sin ejercicios todavía</span>
					<span className="zy-day__cta">
						<PlusIcon /> Planificar rutina
					</span>
				</>
			) : (
				<>
					<span className="zy-day__counts">
						<span>
							{count} {count === 1 ? 'ejercicio' : 'ejercicios'}
						</span>
						<span>
							{totalSets} {totalSets === 1 ? 'serie' : 'series'}
						</span>
					</span>
					<span className="zy-day__preview">{preview}</span>
				</>
			)}
		</Link>
	);
}
