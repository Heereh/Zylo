import { Navigate } from 'react-router';
import { useGymStore } from '@store/GymStore';
import { createWorkoutDay } from '../../api/workoutService';
import { useAuthStore } from '@store/GymUserStore';
import { CustomButton } from '@component-UI';

import { useWorkoutData } from '../../hook/useWorkoutData';
import { DayCard } from '@component/UI/DayCard/DayCard';
import { DayGrid } from '@component/UI/DayCard/DayGrid';
import type { DayOfWeek } from '@types';
import './DashboardStyles.css';

const allDays: { key: DayOfWeek; name: string }[] = [
	{ key: 'Lunes', name: 'Lunes' },
	{ key: 'Martes', name: 'Martes' },
	{ key: 'Miércoles', name: 'Miércoles' },
	{ key: 'Jueves', name: 'Jueves' },
	{ key: 'Viernes', name: 'Viernes' },
	{ key: 'Sábado', name: 'Sábado' },
	{ key: 'Domingo', name: 'Domingo' },
];

const JS_DAY_TO_NAME: DayOfWeek[] = [
	'Domingo',
	'Lunes',
	'Martes',
	'Miércoles',
	'Jueves',
	'Viernes',
	'Sábado',
];
const Dashboard = () => {
	const { addWorkoutDay } = useGymStore();
	const { user } = useAuthStore();
	const { workouts } = useWorkoutData();
	const username = useAuthStore((state) => state.user?.username);

	const existingDays = workouts.map((w) => w.dayOfWeek);
	const availableDays = allDays.filter(
		(day) => !existingDays.includes(day.key),
	);

	const today = JS_DAY_TO_NAME[new Date().getDay()];
	const sortedWorkouts = [...workouts].sort(
		(a, b) =>
			allDays.findIndex((d) => d.key === a.dayOfWeek) -
			allDays.findIndex((d) => d.key === b.dayOfWeek),
	);

	const handleCreateWorkout = async () => {
		if (availableDays.length === 0) {
			return;
		}
		const nextDay = availableDays[0];

		try {
			const newWorkout = await createWorkoutDay(nextDay.key);
			addWorkoutDay(newWorkout);
		} catch (error) {
			console.error('Error al crear el día:', error);
			alert('Hubo un error al crear el día. Por favor, inténtalo de nuevo.');
		}
	};

	if (!user) {
		return (
			<Navigate
				to="/login"
				replace></Navigate>
		);
	}

	return (
		<section className="dashboard-container">
			<div className="dashboard-toast">
				<div className="container-toast">
					<div className="toast-welcome">
						{/* <User /> */}
						<p>
							Bienvenido/a, <span id="username">{username}</span> a tu gimnasio!
						</p>
					</div>
					<div className="user-toast-text">
						<span>
							Planifica, rastrea y optimiza tus rutinas de entrenamiento
							semanales. Hoy es un gran día para entrenar.
						</span>
						<div className="btn-container">
							<CustomButton
								size="small"
								backgroundColor="primary"
								appearance="solid"
								// icon={<Plus size={'1.25rem'} />}
								iconPosition="start"
								onClick={handleCreateWorkout}
								disabled={availableDays.length === 0}>
								Agregar Día
							</CustomButton>
						</div>
					</div>
				</div>
			</div>
			<div className="dashboard-header">
				<div className="header-logo">
					{/* <Calendar /> */}
				</div>
				<div className="header-title__container">
					<h2 className="title">Rutina Semanal</h2>
				</div>
			</div>
			{/* <div className="card-container">
				{workouts.length > 0 ? (
					workouts.map((workout) => (
						<Link
							className="card"
							key={workout._id}
							to={`/workoutDay/${workout._id}`}>
							<div className="card-header">
								<p className="day-name">{workout.dayOfWeek}</p>
								<p className="card-description">Toca para planificar</p>
							</div>
							<div className="icon-container">
								<ChevronRight className="icon" />
							</div>
						</Link>
					))
				) : (
					<p>Crea tu primera rutina haciendo click en 'Agregar Día'</p>
				)}
			</div> */}

			{sortedWorkouts.length > 0 ? (
				<DayGrid>
					{sortedWorkouts.map((workout) => (
						<DayCard
							key={workout._id}
							workout={workout}
							to={`/workoutDay/${workout._id}`}
							isToday={workout.dayOfWeek === today}
						/>
					))}
				</DayGrid>
			) : (
				<p>Crea tu primera rutina haciendo click en 'Agregar Día'</p>
			)}
		</section>
	);
};

export default Dashboard;
