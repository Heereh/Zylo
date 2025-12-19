import { Trash } from 'lucide-react';
import { CustomButton } from '@component-UI';
import { type SeriesTypes } from '@types';

interface ListSeriesProps {
	series: SeriesTypes[];
}

const ListSeries = ({ series }: ListSeriesProps) => {
	return (
		<div
			className="exercise__card-set-card"
			key={0}>
			{/*-- Indicador de series --*/}
			<div className="exercise__card-set-number">{1}</div>

			{/*-- Campos editables --*/}
			<div className="exercise__card_content">
				<div className="exercise__card_input-group">
					<label className="exercise__card-label">Series</label>
					<input
						className="exercise__card-input"
						defaultValue={0}></input>
				</div>
				<div className="exercise__card_input-group">
					<label className="exercise__card-label">Reps</label>
					<input
						className="exercise__card-input"
						defaultValue={0}></input>
				</div>

				<div className="exercise__card_input-group">
					<label className="exercise__card-label">Peso(kg)</label>
					<input
						className="exercise__card-input"
						defaultValue={0}></input>
				</div>

				<CustomButton
					size="small"
					backgroundColor="danger"
					appearance="ghost">
					<Trash />
				</CustomButton>
				{/*-- Acciones --*/}
			</div>
		</div>
	);
};

export default ListSeries;
