import * as yup from "yup";

export const registerValidationSchema = yup.object({
  username: yup.string().trim().required("El nombre es requerido"),
  email: yup
    .string()
    .email("Correo electronico invalido")
    .required("Este campo es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Este campo es obligatorio"),
});

export const loginValidationSchema = yup.object({
  email: yup.string().email("Email inválido").required("Campo Requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Campo Requerido"),
});
