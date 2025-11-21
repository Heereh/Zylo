import { useState } from 'react';
import './Tabs.css';

// Define la estructura para una sola pestaña para que puedas usarla en otros componentes
export interface Tab {
	title: string;
	children: React.ReactNode;
}

// Define las props para el componente Tabs
interface TabsProps {
	tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="tabs-container">
			<div className="tabs-list">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`tab-button ${index === activeTab ? 'active' : ''}`}
						onClick={() => setActiveTab(index)}>
						{tab.title}
					</button>
				))}
			</div>
			<div className="tabs-content">{tabs[activeTab].children}</div>
		</div>
	);
};

export default Tabs;
