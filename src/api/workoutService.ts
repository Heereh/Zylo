import type { WorkoutTypes } from "@types";
import handleApiError from "../utils/handleApiError";
import { parseWorkoutData } from "../utils/workoutTransformer";
import authApi from "./apiClient";

export const createWorkoutDay = async (data: string) => {
  try {
    const dayData = {
      dayOfWeek: data,
      workoutName: "Mi rutina de ejercicios",
    };

    const response = await authApi.post(`/days`, dayData);
    return response.data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const getAllWorkouts = async () => {
  try {
    const response = await authApi.get("/days");
    return response.data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const updateWorkoutDay = async (
  dayId: string,
  UpdatedData: WorkoutTypes,
) => {
  try {
    const response = await authApi.put(`/days/${dayId}`, UpdatedData);
    return response.data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const getWorkoutDaysById = async (dayId: string) => {
  try {
    const response = await authApi.get(`/days/${dayId}`);
    parseWorkoutData(response.data);
    return parseWorkoutData;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const deleteExercise = async (dayId: string, exerciseId: string) => {
  try {
    await authApi.delete(`/days/${dayId}/exercises/${exerciseId}`);
    return true;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
