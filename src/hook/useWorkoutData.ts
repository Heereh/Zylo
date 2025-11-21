import { useGymStore } from "@store/GymStore"
import { useAuthStore } from "@store/GymUserStore"
import { useCallback, useEffect } from "react"
import { getAllWorkouts } from "../api/workoutService"

export const useWorkoutData = ()=>{

  const { setWorkouts, workouts } = useGymStore()
  const {user, setLoading} = useAuthStore()

  const fetchWorkouts = useCallback(async () => {
		setLoading(true);
		try {
			const workoutsFromApi = await getAllWorkouts();
			setWorkouts(workoutsFromApi);
		} catch (error) {
			console.error('Error al obtener las rutinas:', error);
		} finally {
			setLoading(false);
		}
	}, [setWorkouts]);

	useEffect(() => {
		if (user && workouts.length === 0) {
			fetchWorkouts();
		} else if (workouts.length > 0) {
			setLoading(false);
		}
	}, [user, workouts.length, fetchWorkouts]);

  return{
    workouts
  }
}