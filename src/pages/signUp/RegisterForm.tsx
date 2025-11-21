import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerValidationSchema } from '../../formik/ValidationSchema';
import { type registerInitialValues } from '../../formik/initialValues';
import { CustomButton } from '@component-IU';
import { createUser } from '../../api/authService';
import { LoaderCircle, Lock, Mail, User } from 'lucide-react';
import './signUpStyles.css';
import { useAuthForm } from '../../hook/useAuthForm';

const initialValues: registerInitialValues = {
	username: '',
	email: '',
	password: '',
};

const RegisterForm = () => {
	const { handleSubmit } = useAuthForm(createUser);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={registerValidationSchema}
			onSubmit={handleSubmit}>
			{({ isSubmitting }) => (
				<Form className="form">
					<div className="formGroup">
						<label htmlFor="name-register">Nombre</label>
						<div className="input-with-icon">
							<User
								className="input-icon"
								size={20}></User>
							<Field
								id="name-register"
								type="text"
								name="username"
								placeholder="Tu nombre"
								required
							/>
						</div>
						<ErrorMessage
							name="username"
							component="div"
							className="error"
						/>
					</div>
					<div className="formGroup">
						<label htmlFor="email-register">Email</label>
						<div className="input-with-icon">
							<Mail
								className="input-icon"
								size={20}></Mail>
							<Field
								id="email-register"
								name="email"
								type="email"
								placeholder="nombre@ejemplo.com"
								required
							/>
						</div>
						<ErrorMessage
							name="email"
							component="div"
							className="error"
						/>
					</div>
					<div className="formGroup">
						<label htmlFor="password-register">Contraseña</label>
						<div className="input-with-icon">
							<Lock
								className="input-icon"
								size={20}></Lock>
							<Field
								id="password-register"
								name="password"
								type="password"
								required
								placeholder="Min. 8 caracteres"
							/>
						</div>
						<ErrorMessage
							name="password"
							component="div"
							className="error"
						/>
					</div>
					<CustomButton
						type="submit"
						disabled={isSubmitting}
						size="mediun">
						{isSubmitting && <LoaderCircle className="loadingIcon" />}
						Crear Cuenta
					</CustomButton>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
