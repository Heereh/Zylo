import './LoadingSpinnerStyles.css';

const LoadingSpinner = () => {
	return (
		<div className="loading-container">
			<div className="loading-spinner"></div>
			<p className="loading-text">Cargando datos...</p>
		</div>
	);
};

export default LoadingSpinner;
