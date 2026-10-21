import { useAuthStore } from '@store/GymUserStore';
import { useNavigate } from 'react-router';

export const useAuthForm = (apiCall: (values: any) => Promise<any>) => {
	const navigate = useNavigate();
	const { login, setLoading } = useAuthStore();

	const handleSubmit = async (
		values: any,
		{ setSubmitting, setErrors }: any,
	) => {
		try {
			setLoading(true);
			const userData = await apiCall(values);

			if (!userData?.token || !userData?.user) {
				throw new Error(
					'La respuesta del servidor no contiene una sesión válida.',
				);
			}

			login(userData);
			navigate('/', { replace: true });
		} catch (error: unknown) {
			const message =
				error instanceof Error
					? error.message
					: 'Hubo un error. Inténtalo nuevamente.';
			setErrors({ email: message });
		} finally {
			setLoading(false);
			setSubmitting(false);
		}
	};

	return { handleSubmit };
};
