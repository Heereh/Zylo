import type {
	CreateDayPayload,
	DayWorkout,
	DayOfWeek,
	Exercise,
	UpdateDayPayload,
} from '@types';
import handleApiError from '../utils/handleApiError';
import { parseWorkoutData } from '../utils/workoutTransformer';
import authApi from './apiClient';

export const createWorkoutDay = async (data: CreateDayPayload | DayOfWeek) => {
	try {
		const dayData: CreateDayPayload =
			typeof data === 'string'
				? { dayOfWeek: data, workoutName: 'Mi rutina de ejercicios' }
				: data;

		const response = await authApi.post<DayWorkout>('/days', dayData);
		return response.data;
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export const getAllWorkouts = async () => {
	try {
		const response = await authApi.get('/days');
		return parseWorkoutData(response.data) as DayWorkout[];
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export const updateWorkoutDay = async (
	dayId: string,
	updatedData: UpdateDayPayload,
) => {
	try {
		const response = await authApi.put<DayWorkout>(
			`/days/${dayId}`,
			updatedData,
		);
		return response.data;
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export const addExerciseToWorkoutDay = async (
	dayId: string,
	exercises: Exercise[],
	exercise: Exercise,
) => updateWorkoutDay(dayId, { exercises: [...exercises, exercise] });

export const updateExerciseInWorkoutDay = async (
	dayId: string,
	exercises: Exercise[],
	exerciseId: string,
	updatedExercise: Exercise,
) => updateWorkoutDay(dayId, {
	exercises: exercises.map((exercise) =>
		exercise._id === exerciseId ? updatedExercise : exercise,
	),
});

export const getWorkoutDaysById = async (dayId: string) => {
	try {
		const response = await authApi.get(`/days/${dayId}`);
		return parseWorkoutData(response.data) as DayWorkout;
	} catch (error: unknown) {
		return handleApiError(error);
	}
};

export const deleteExercise = async (dayId: string, exerciseId: string) => {
	try {
		await authApi.delete(`/days/${dayId}/exercises/${exerciseId}`);
		return true;
	} catch (error: unknown) {
		return handleApiError(error);
	}
};
