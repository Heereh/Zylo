import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginValidationSchema } from '../../formik/ValidationSchema';
import { type initialValuesLogin } from '../../formik/initialValues';
import { CustomButton } from '@component-IU';
import { loginUser } from '../../api/authService';
import { LoaderCircle, Lock, Mail } from 'lucide-react';
import './signUpStyles.css';
import { useAuthForm } from '../../hook/useAuthForm';

const initialValues: initialValuesLogin = {
	email: '',
	password: '',
	id: '',
	token: '',
};

const LoginForm = () => {
	const {handleSubmit} = useAuthForm(loginUser)
	
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={loginValidationSchema}
			onSubmit={handleSubmit}>
			{({ isSubmitting }) => (
				<Form className="form">
					<div className="formGroup">
						<label htmlFor="email-login">Email</label>
						<div className="input-with-icon">
							<Mail
								className="input-icon"
								size={20}
							/>
							<Field
								id="email-login"
								name="email"
								type="email"
								placeholder="email@ejemplo.com"
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
						<label htmlFor="password-login">Contraseña</label>
						<div className="input-with-icon">
							<Lock
								className="input-icon"
								size={20}
							/>
							<Field
								id="password-login"
								name="password"
								type="password"
								placeholder="********"
								required
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
						Iniciar Sesión
					</CustomButton>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
