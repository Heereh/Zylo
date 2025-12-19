import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WorkoutTypes, ExerciseTypes, SeriesTypes } from '@types';

interface GymTrackerStore {
	workouts: WorkoutTypes[];
	setWorkouts: (workouts: WorkoutTypes[]) => void;
	addWorkoutDay: (workoutDay: WorkoutTypes) => void;
	removeWorkoutDay: (workoutId: string) => void;
	updateWorkoutDay: (
		workoutId: string,
		updateData: Partial<WorkoutTypes>,
	) => void;
	addExercise: (exercise: ExerciseTypes, workoutId: string) => void;
	addSeries: (workoutId: string, exerciseId: string) => void;
	removeExercise: (exerciseId: string, workoutId: string) => void;
	updateExercise: (
		workoutId: string,
		exerciseId: string,
		updateData: Partial<ExerciseTypes>,
	) => void;
}
/* {
          id: Date.now().toString(),
          day: 'Lunes',
          exercises: [
            {
              id: Date.now().toString(),
              name: 'Sentadilla',
              sets: 0,
              reps: '',
              weight: 0,
              nota: '',
            },
          ],
        }, */
export const useGymStore = create(
	persist<GymTrackerStore>(
		(set) => ({
			workouts: [],
			setWorkouts: (workouts: WorkoutTypes[]) => set({ workouts }),
			addWorkoutDay: (newWorkout: WorkoutTypes) => {
				set((state) => ({
					workouts: [...state.workouts, newWorkout],
				}));
			},
			removeWorkoutDay: (workoutId) => {
				set((state) => ({
					workouts: state.workouts.filter((w) => w._id !== workoutId),
				}));
			},
			updateWorkoutDay: (workoutId, updateData) => {
				set((state) => ({
					workouts: state.workouts.map((workout) =>
						workout._id === workoutId ? { ...workout, ...updateData } : workout,
					),
				}));
			},

			addExercise: (newExercise, workoutId) => {
				set((state) => ({
					workouts: state.workouts.map((workout) =>
						workout._id === workoutId
							? { ...workout, exercises: [...workout.exercises, newExercise] }
							: workout,
					),
				}));
			},
			addSeries: (workoutId, exerciseId) => {
				const newSerie: SeriesTypes = {
					_id: Date.now().toString(),
					sets: 1,
					reps: '10',
					weightKg: 0,
				};

				set((state) => ({
					workouts: state.workouts.map((workout) => {
						if (workout._id === workoutId) {
							return {
								...workout,
								exercises: workout.exercises.map((exercise) => {
									if (exercise._id === exerciseId) {
										return {
											...exercise,
											series: [...exercise.series, newSerie], // Agrega la nueva serie
										};
									}
									return exercise;
								}),
							};
						}
						return workout;
					}),
				}));
			},
			removeExercise: (workoutId, exerciseId) => {
				set((state) => ({
					workouts: state.workouts.map((workout) => {
						if (workout._id === workoutId) {
							return {
								...workout,
								exercises: workout.exercises.filter(
									(ex) => ex._id !== exerciseId,
								),
							};
						}
						return workout;
					}),
				}));
			},
			updateExercise: (workoutId, exerciseId, updateData) => {
				set((state) => ({
					workouts: state.workouts.map((workout) => {
						if (workout._id === workoutId) {
							return {
								...workout,
								exercises: workout.exercises.map((exercise) =>
									exercise._id === exerciseId
										? { ...exercise, ...updateData }
										: exercise,
								),
							};
						}
						return workout;
					}),
				}));
			},
		}),
		{ name: 'gym-tracker' },
	),
);
