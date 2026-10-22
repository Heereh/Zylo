import type { DayWorkout } from '../types';

type WorkoutDataIn = DayWorkout | DayWorkout[];
type WorkoutDataOut = DayWorkout | DayWorkout[];

export const parseWorkoutData = (data: WorkoutDataIn): WorkoutDataOut => {
	if (Array.isArray(data)) {
		return data.map((workout) => parseWorkoutData(workout) as DayWorkout);
	}
	return data;
};
