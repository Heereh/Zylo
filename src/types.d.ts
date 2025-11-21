export type User = {
  id: number;
  name: string;
};

export type WorkoutTypes = {
  _id: string;
  dayOfWeek: string;
  exercises: ExerciseTypes[];
  completed?: boolean;
};

export type ExerciseTypes = {
  _id: string;
  name: string;
  sets: number;
  reps: string;
  weightKg: number;
  notes: string;
};

export interface ExerciseApi extends Omit<ExerciseTypes, "_id"> {
  id?: string;
}

export interface WorkoutApi extends Omit<WorkoutTypes, "_id"> {
  id?: string;
  userId?: string;
  exercises: ExerciseApi[];
}

export type ExerciseFormData = Omit<ExerciseTypes, "id">;