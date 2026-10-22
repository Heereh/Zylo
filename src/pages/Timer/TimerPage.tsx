import { RestTimer } from '@component-UI';
import './TimerPage.css';

/* Reutiliza el contenedor de página de ExerciseDays (.workout__container) para alinear con el resto de pantallas. */
const TimerPage = () => (
	<div className="workout__container">
		<div className="workout__title-container">
			<h2 className="workout__title">Temporizador</h2>
		</div>
		<div className="zy-timer-page__body">
			<RestTimer />
		</div>
	</div>
);

export default TimerPage;
