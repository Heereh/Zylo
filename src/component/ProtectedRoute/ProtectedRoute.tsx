import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@store/GymUserStore';
import { LoadingSpinner } from '@component-IU';

const ProtectedRoute = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggenIn);
	const isLoading = useAuthStore((state) => state.isLoading);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!isLoggedIn) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
