export type DayOfWeek =
	| 'Lunes'
	| 'Martes'
	| 'Miércoles'
	| 'Jueves'
	| 'Viernes'
	| 'Sábado'
	| 'Domingo';

export type WorkoutSet = {
	_id?: string;
	reps: number;
	weightKg?: number;
	rpe?: number;
	completed?: boolean;
};

export type Exercise = {
	_id?: string;
	exerciseId?: string;
	name: string;
	notes?: string;
	sets: WorkoutSet[];
};

export type DayWorkout = {
	_id: string;
	userId: string;
	date: string;
	dayOfWeek: DayOfWeek;
	workoutName?: string;
	exercises: Exercise[];
	completed: boolean;
	notes?: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateDayPayload = {
	dayOfWeek: DayOfWeek;
	workoutName?: string;
};

export type ExerciseFormData = {
	_id?: string;
	exerciseId?: string;
	name: string;
	sets: number;
	reps: number;
	weightKg: number;
	notes: string;
};

export type UpdateDayPayload = {
	dayOfWeek?: DayOfWeek;
	workoutName?: string;
	exercises?: Exercise[];
	completed?: boolean;
	notes?: string;
};

export type WorkoutTypes = DayWorkout;
export type ExerciseTypes = Exercise;
export type WorkoutApi = DayWorkout;
export type ExerciseApi = Exercise;
