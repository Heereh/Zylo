import { useEffect, useId, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@component-UI';
import {
	MAX_SECONDS,
	MIN_SECONDS,
	PRESETS,
	formatPreset,
	formatTime,
	parseDuration,
} from '../../../utils/timerUtils';
import { useTimerStore } from '../../../store/TimerStore';
import './RestTimer.css';

const STATUS_TEXT = {
	idle: 'Listo para descansar',
	running: 'Descansando',
	paused: 'En pausa',
	finished: 'Descanso terminado',
} as const;

const MAIN_LABEL = {
	idle: 'Iniciar',
	running: 'Pausar',
	paused: 'Reanudar',
	finished: 'Iniciar de nuevo',
} as const;

export type RestTimerProps = {
	/** Versión en una fila, para embeber en el registro de series. */
	compact?: boolean;
};

export function RestTimer({ compact = false }: RestTimerProps) {
	const uid = useId();
	const {
		status,
		durationSec,
		endAt,
		remainingMs,
		alertOn,
		selectDuration,
		start,
		pause,
		resume,
		reset,
		toggleAlert,
	} = useTimerStore();

	const [now, setNow] = useState(() => Date.now());
	const [customOpen, setCustomOpen] = useState(false);
	const [customValue, setCustomValue] = useState('');
	const [customError, setCustomError] = useState<string | null>(null);

	useEffect(() => {
		if (status !== 'running') return;
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(id);
	}, [status]);

	const remaining =
		status === 'running' && endAt !== null
			? Math.max(0, endAt - now)
			: remainingMs;
	const progress =
		durationSec > 0 ? Math.min(1, remaining / (durationSec * 1000)) : 0;
	const locked = status === 'running' || status === 'paused';
	const isPreset = (PRESETS as readonly number[]).includes(durationSec);

	const handleMain = () => {
		if (status === 'running') pause();
		else if (status === 'paused') resume();
		else start();
	};

	const applyCustom = (ev: FormEvent) => {
		ev.preventDefault();
		const seconds = parseDuration(customValue);
		if (seconds === null) {
			setCustomError(
				`Escribe el tiempo como mm:ss (ej. 1:45) o en segundos, entre ${MIN_SECONDS} s y ${MAX_SECONDS / 60} min.`,
			);
			return;
		}
		selectDuration(seconds);
		setCustomError(null);
		setCustomOpen(false);
		setCustomValue('');
	};

	const customSelected = !isPreset || customOpen;

	return (
		<section
			className="zy-timer"
			data-status={status}
			data-compact={compact || undefined}
			aria-label="Temporizador de descanso">
			<div className="zy-timer__display">
				<p
					className="zy-timer__status"
					role="status">
					{status === 'finished' && (
						<Check
							size={18}
							aria-hidden="true"
						/>
					)}
					{STATUS_TEXT[status]}
				</p>
				<div
					className="zy-timer__time"
					role="timer"
					aria-live="off">
					{formatTime(remaining)}
				</div>
				{!compact && (
					<div
						className="zy-timer__bar"
						aria-hidden="true">
						<div
							className="zy-timer__bar-fill"
							style={{ '--progress': progress } as CSSProperties}
						/>
					</div>
				)}
			</div>

			{!compact && (
				<div className="zy-timer__settings">
					<div
						className="zy-timer__presets"
						role="group"
						aria-label="Tiempo de descanso">
						{PRESETS.map((seconds) => {
							const selected = !customOpen && durationSec === seconds;
							return (
								<button
									key={seconds}
									type="button"
									className="zy-chip"
									aria-pressed={selected}
									disabled={locked}
									onClick={() => {
										setCustomOpen(false);
										selectDuration(seconds);
									}}>
									{selected && (
										<Check
											size={16}
											aria-hidden="true"
										/>
									)}
									{formatPreset(seconds)}
								</button>
							);
						})}
						<button
							type="button"
							className="zy-chip"
							aria-pressed={customSelected}
							disabled={locked}
							onClick={() => {
								setCustomError(null);
								setCustomOpen((open) => !open);
							}}>
							{customSelected && !customOpen && (
								<Check
									size={16}
									aria-hidden="true"
								/>
							)}
							{!isPreset
								? `Personalizado · ${formatPreset(durationSec)}`
								: 'Personalizado'}
						</button>
					</div>

					{customOpen && !locked && (
						<form
							className="zy-timer__custom"
							onSubmit={applyCustom}
							noValidate>
							<div className="zy-timer__field">
								<label
									className="zy-timer__label"
									htmlFor={`${uid}-custom`}>
									Duración (mm:ss o segundos)
								</label>
								<input
									id={`${uid}-custom`}
									className="zy-timer__input"
									type="text"
									inputMode="numeric"
									placeholder="1:45"
									value={customValue}
									onChange={(e) => {
										setCustomValue(e.target.value);
										setCustomError(null);
									}}
									aria-invalid={customError ? true : undefined}
									aria-describedby={
										customError ? `${uid}-custom-error` : undefined
									}
									autoFocus
								/>
							</div>
							<Button
								type="submit"
								size="small"
								appearance="outline"
								backgroundColor="neutral">
								Aplicar
							</Button>
							{customError && (
								<p
									id={`${uid}-custom-error`}
									className="zy-timer__error">
									{customError}
								</p>
							)}
						</form>
					)}

					<label className="zy-timer__alert">
						<input
							type="checkbox"
							checked={alertOn}
							onChange={toggleAlert}
						/>
						Avisar al terminar (sonido y vibración)
					</label>
				</div>
			)}

			<div className="zy-timer__actions">
				<Button
					className="zy-timer__main"
					size="medium"
					onClick={handleMain}>
					{MAIN_LABEL[status]}
				</Button>
				<Button
					size="medium"
					appearance="outline"
					backgroundColor="neutral"
					onClick={reset}
					disabled={status === 'idle'}>
					Reiniciar
				</Button>
			</div>
		</section>
	);
}

export default RestTimer;
