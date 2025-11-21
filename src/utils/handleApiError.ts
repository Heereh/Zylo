import { AxiosError } from "axios";

export const handleApiError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    if (error.code === "ERR_NETWORK") {
      throw new Error("Error de conexión. El servidor no está disponible.");
    }

    if (error.response) {
      throw new Error(
        `Error ${error.response.status}: Ocurrió un problema con la solicitud.`,
      );
    }
  }

  throw new Error(
    "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
  );
};

export default handleApiError;
