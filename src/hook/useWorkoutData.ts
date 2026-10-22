import { useGymStore } from '@store/GymStore';
import { useAuthStore } from '@store/GymUserStore';
import { useCallback, useEffect } from 'react';
import { getAllWorkouts } from '../api/workoutService';

export const useWorkoutData = () => {
	const { setWorkouts, workouts } = useGymStore();
	const { user, setLoading } = useAuthStore();

	const fetchWorkouts = useCallback(async () => {
		try {
			const workoutsFromApi = await getAllWorkouts();
			setWorkouts(workoutsFromApi);
		} catch (error) {
			console.error('Error al obtener las rutinas:', error);
		} finally {
			setLoading(false);
		}
	}, [setLoading, setWorkouts]);

	useEffect(() => {
		if (!user) return;

		setLoading(useGymStore.getState().workouts.length === 0);
		void fetchWorkouts();
	}, [fetchWorkouts, setLoading, user]);

	return {
		workouts,
	};
};
