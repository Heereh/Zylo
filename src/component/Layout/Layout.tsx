import { Outlet } from 'react-router';
import { useAuthStore } from '@store/GymUserStore';
import Header from '@component/Header/Header';

export const Layout = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggenIn);

	return (
		<>
			{isLoggedIn && <Header />}
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
