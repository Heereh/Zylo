import { useOpen } from '../../../hook/useOpen';

export const DropdownMenu = () => {
	const { isOpen, OpenUI, CloseUI } = useOpen();

	const toggleDropdown = () => {
		if (isOpen) {
			CloseUI();
		} else {
			OpenUI();
		}
	};

	return (
		<div className="dropdown">
			<button
				className="dropdown-toggle"
				onClick={toggleDropdown}
				onBlur={CloseUI}
				
				>
				Dropdown
			</button>
			{isOpen && (
				<div className="dropdown-content">
					<a href="/profile">Perfil</a>
					<a href="/settings">Configuración</a>
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
