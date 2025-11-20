import { useState } from 'react';
import { useOpen } from '../../../hook/useOpen';

export const DropdownMenu = () => {
	const { isOpen, OpenUI, CloseUI } = useOpen();

	const toggleDropdown = () => {
		OpenUI();
	};

	return (
		<div className="dropdown">
			<button
				className="dropdown-toggle"
				onClick={toggleDropdown}>
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
