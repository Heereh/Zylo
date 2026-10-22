import { useAuthStore } from '@store/GymUserStore';
import { Button } from '@component-UI';
import {
	CircleUser,
	Settings,
	LogOut,
	ChevronDown,
	CalendarDays,
	Dumbbell,
	Timer,
} from 'lucide-react';
import './header.css';

import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { useOpen } from '../../hook/useOpen';
const Header = () => {
	const { logout, user } = useAuthStore();
	const navigate = useNavigate();
	const { CloseUI, OpenUI, isOpen } = useOpen();

	const closeOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		// Solo cierra si realmente el foco salió del componente principal
		if (!e.currentTarget?.contains(e.relatedTarget) && isOpen) {
			CloseUI();
		}
	};

	const toggleDrawer = () => {
		if (isOpen) {
			CloseUI();
		} else {
			OpenUI();
		}
	};

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<header id="header">
			<div className="header-logo">
				<img
					className="logo-icon"
					src="/favicon.ico"
					alt="logo"
				/>
				<Link
					className="logo-title"
					to="/">
					Zylo
				</Link>
			</div>
			<nav
				className="main-navigation"
				aria-label="Navegación principal">
				<Link
					className="navigation-link navigation-link--active"
					to="/">
					<CalendarDays
						size={20}
						aria-hidden="true"
					/>
					<span>Mi semana</span>
				</Link>
				<Link
					className="navigation-link"
					to="/">
					<Dumbbell
						size={20}
						aria-hidden="true"
					/>
					<span>Entrenamientos</span>
				</Link>
				<Link
					className="navigation-link navigation-link--active"
					to="/timer">
					<Timer
						size={20}
						aria-hidden="true"
					/>
					<span>Temporizador</span>
				</Link>
			</nav>
			<div
				className="drawer"
				onBlur={closeOnBlur}
				tabIndex={0}>
				<button
					type="button"
					className="icon-drawer"
					onClick={toggleDrawer}
					aria-expanded={isOpen}
					aria-controls="user-menu"
					aria-label={
						isOpen ? 'Cerrar menú de usuario' : 'Abrir menú de usuario'
					}>
					<CircleUser
						size={20}
						aria-hidden="true"
					/>
					<ChevronDown
						className={isOpen ? 'is-open' : ''}
						size={16}
						aria-hidden="true"
					/>
				</button>

				<div
					id="user-menu"
					className={`drawer-content ${isOpen ? 'is-open' : ''}`}>
					<div className="drawer-content__top">
						<div className="user-info">
							<span className="user-avatar">
								<CircleUser size={20} />
							</span>
							<div className="user">
								<span className="user-name">{user?.username}</span>
								<span className="user-email">{user?.email}</span>
							</div>
						</div>
					</div>

					<div className="divider"></div>

					<div className="drawer-content__bottom">
						<div className="btn-drawer__container">
							<div className="btn-drawer__items">
								<Button
									icon={<Settings size="20px" />}
									iconPosition="end"
									size="small"
									appearance="outline"
									backgroundColor="secondary"
									disabled>
									Configuración
								</Button>

								<Button
									icon={<LogOut size="20px" />}
									iconPosition="end"
									size="small"
									appearance="ghost"
									backgroundColor="danger"
									onClick={handleLogout}>
									Cerrar sesión
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
