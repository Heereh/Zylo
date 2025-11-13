import type {
  registerInitialValues,
  initialValuesLogin,
} from "../formik/initialValues";
import { useAuthStore } from "../store/GymUserStore";
import authApi from "./apiClient";
import { AxiosError } from "axios";

export const createUser = async (userData: registerInitialValues) => {
  try {
    const response = await authApi.post("/auth/register", userData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }

      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Error de conexión. Verifica tu conexión a internet o el servidor.",
        );
      }

      if (error.response) {
        throw new Error(
          `Error ${error.response.status}: Ha ocurrido un problema con la solicitud.`,
        );
      }
    }
    throw new Error("Ocurrió un error inesperado durante el registro.");
  }
};

export const loginUser = async (userData: initialValuesLogin) => {
  try {
    const response = await authApi.post("/auth/login", userData);
    useAuthStore.getState().login(response.data.user);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }

      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Error de conexión. Verifica tu conexión a internet o el servidor.",
        );
      }

      if (error.response) {
        throw new Error(
          `Error ${error.response.status}: Ha ocurrido un problema con la solicitud.`,
        );
      }
    }
  }
};
