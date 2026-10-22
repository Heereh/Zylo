import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
//import { Button, IconButton } from './Button';
import { CheckIcon, ChevronDownIcon, TrashIcon } from '../../../assets/Icons';
import type { Exercise, ExerciseFormData } from '@types';
import './ExerciseCard.css';
import CustomButton from '../CustomButton/CustomButton';

/* ---------- Helpers ---------- */

const range = (values: Array<number | undefined>): string | null => {
	const nums = values.filter((v): v is number => typeof v === 'number');
	if (!nums.length) return null;
	const min = Math.min(...nums);
	const max = Math.max(...nums);
	return min === max ? `${min}` : `${min}–${max}`;
};

type Draft = {
	name: string;
	sets: string;
	reps: string;
	weight: string;
	notes: string;
};
type DraftErrors = Partial<Record<keyof Draft, string>>;

const toDraft = (e: Exercise): Draft => ({
	name: e.name,
	sets: String(e.sets.length || 1),
	reps: e.sets[0]?.reps !== undefined ? String(e.sets[0].reps) : '',
	weight: e.sets[0]?.weightKg ? String(e.sets[0].weightKg) : '',
	notes: e.notes ?? '',
});

const parseNumber = (v: string) => Number(v.trim().replace(',', '.'));

const validate = (d: Draft): DraftErrors => {
	const errors: DraftErrors = {};
	if (!d.name.trim()) errors.name = 'Escribe el nombre del ejercicio.';
	const sets = parseNumber(d.sets);
	if (!Number.isInteger(sets) || sets < 1 || sets > 20)
		errors.sets = 'Entre 1 y 20.';
	const reps = parseNumber(d.reps);
	if (d.reps.trim() === '' || !Number.isInteger(reps) || reps < 1 || reps > 100)
		errors.reps = 'Entre 1 y 100.';
	if (d.weight.trim() !== '') {
		const w = parseNumber(d.weight);
		if (Number.isNaN(w) || w < 0)
			errors.weight = 'Usa un número mayor o igual a 0.';
	}
	return errors;
};

/** Mismo formato que el modal de crear (ExerciseFormData), con _id para identificar la edición.
 *  Peso vacío se envía como 0 porque ExerciseFormData.weightKg es obligatorio. */
const toFormData = (e: Exercise, d: Draft): ExerciseFormData => ({
	_id: e._id,
	exerciseId: e.exerciseId,
	name: d.name.trim(),
	sets: parseNumber(d.sets),
	reps: parseNumber(d.reps),
	weightKg: d.weight.trim() === '' ? 0 : parseNumber(d.weight),
	notes: d.notes.trim(),
});

const SAVE_ERROR =
	'No se pudo guardar el ejercicio. Revisa tu conexión e inténtalo de nuevo.';
const DELETE_ERROR = 'No se pudo eliminar el ejercicio. Inténtalo de nuevo.';

/* ---------- Campo ---------- */

type FieldProps = {
	id: string;
	label: string;
	value: string;
	onChange: (v: string) => void;
	error?: string;
	inputMode?: 'text' | 'numeric' | 'decimal';
	multiline?: boolean;
	placeholder?: string;
};

function Field({
	id,
	label,
	value,
	onChange,
	error,
	inputMode = 'text',
	multiline,
	placeholder,
}: FieldProps) {
	const errorId = `${id}-error`;
	const shared = {
		id,
		value,
		placeholder,
		className: 'zy-field__control',
		'aria-invalid': error ? true : undefined,
		'aria-describedby': error ? errorId : undefined,
	} as const;
	return (
		<div className="zy-field">
			<label
				className="zy-field__label"
				htmlFor={id}>
				{label}
			</label>
			{multiline ? (
				<textarea
					{...shared}
					rows={3}
					onChange={(e) => onChange(e.target.value)}
				/>
			) : (
				<input
					{...shared}
					type="text"
					inputMode={inputMode}
					onChange={(e) => onChange(e.target.value)}
				/>
			)}
			{error && (
				<p
					id={errorId}
					className="zy-field__error">
					{error}
				</p>
			)}
		</div>
	);
}

/* ---------- ExerciseCard ---------- */

type ActionResult = boolean | void;

export type ExerciseCardProps = {
	exercise: Exercise;
	/** Devuelve false (o lanza) si falla: la tarjeta muestra el error y conserva lo escrito. */
	onSave: (data: ExerciseFormData) => ActionResult | Promise<ActionResult>;
	/** Devuelve false (o lanza) si falla. */
	onDelete: () => ActionResult | Promise<ActionResult>;
	defaultExpanded?: boolean;
};

export function ExerciseCard({
	exercise,
	onSave,
	onDelete,
	defaultExpanded = false,
}: ExerciseCardProps) {
	const uid = useId();
	const panelId = `${uid}-panel`;

	const [expanded, setExpanded] = useState(defaultExpanded);
	const [draft, setDraft] = useState<Draft>(() => toDraft(exercise));
	const [errors, setErrors] = useState<DraftErrors>({});
	const [saving, setSaving] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const toggleRef = useRef<HTMLButtonElement>(null);
	const deleteBtnRef = useRef<HTMLButtonElement>(null);
	const cancelDeleteRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (confirmingDelete) cancelDeleteRef.current?.focus();
	}, [confirmingDelete]);

	const setsCount = exercise.sets.length;
	const reps = range(exercise.sets.map((s) => s.reps));
	const weight = range(exercise.sets.map((s) => s.weightKg));
	const weightLabel = weight && weight !== '0' ? `${weight} kg` : 'Sin peso';
	const completed = setsCount > 0 && exercise.sets.every((s) => s.completed);

	const open = () => {
		setDraft(toDraft(exercise));
		setErrors({});
		setFormError(null);
		setExpanded(true);
	};
	const close = () => {
		setExpanded(false);
		requestAnimationFrame(() => toggleRef.current?.focus());
	};

	const update = (key: keyof Draft) => (value: string) => {
		setDraft((d) => ({ ...d, [key]: value }));
		if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
	};

	const handleSubmit = async (ev: FormEvent) => {
		ev.preventDefault();
		const found = validate(draft);
		setErrors(found);
		if (Object.keys(found).length) return;

		setSaving(true);
		setFormError(null);
		try {
			const ok = await onSave(toFormData(exercise, draft));
			if (ok === false) {
				setFormError(SAVE_ERROR);
				return;
			}
			close();
		} catch {
			setFormError(SAVE_ERROR);
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		setDeleting(true);
		setDeleteError(null);
		try {
			const ok = await onDelete();
			if (ok === false) {
				setDeleteError(DELETE_ERROR);
				return;
			}
			setConfirmingDelete(false);
		} catch {
			setDeleteError(DELETE_ERROR);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<article
			className="zy-ex"
			role="listitem"
			data-expanded={expanded}
			data-completed={completed || undefined}>
			<div className="zy-ex__head">
				<button
					ref={toggleRef}
					type="button"
					className="zy-ex__toggle"
					aria-expanded={expanded}
					aria-controls={expanded ? panelId : undefined}
					onClick={() => (expanded ? close() : open())}>
					<span className="zy-ex__main">
						<span className="zy-ex__title">
							<span
								className="zy-ex__name"
								title={exercise.name}>
								{exercise.name}
							</span>
							{completed && (
								<span className="zy-ex__done">
									<CheckIcon /> Completado
								</span>
							)}
						</span>
						<span className="zy-ex__stats">
							<span className="zy-ex__stat zy-ex__stat--sets">
								{setsCount} {setsCount === 1 ? 'serie' : 'series'}
							</span>
							<span className="zy-ex__stat zy-ex__stat--reps">
								{reps ? `${reps} reps` : '—'}
							</span>
							<span className="zy-ex__stat zy-ex__stat--weight">
								{weightLabel}
							</span>
						</span>
						{!expanded && exercise.notes && (
							<span className="zy-ex__note">{exercise.notes}</span>
						)}
					</span>
					<ChevronDownIcon className="zy-ex__chevron" />
				</button>
				<div className="zy-ex__actions">
					{/* <IconButton
						ref={deleteBtnRef}
						variant="destructive"
						label={`Eliminar ${exercise.name}`}
						icon={<TrashIcon />}
						onClick={() => setConfirmingDelete(true)}
						disabled={confirmingDelete}
					/> */}
					<CustomButton
						icon={<TrashIcon />}
						size="small"
						backgroundColor="danger"
						appearance="solid"
						onClick={() => setConfirmingDelete(true)}
						disabled={confirmingDelete}>
						Eliminar
					</CustomButton>
				</div>
			</div>

			{expanded && !confirmingDelete && (
				<form
					id={panelId}
					className="zy-ex__panel"
					onSubmit={handleSubmit}
					noValidate>
					<div className="zy-ex__fields">
						<Field
							id={`${uid}-name`}
							label="Nombre del ejercicio"
							value={draft.name}
							onChange={update('name')}
							error={errors.name}
						/>
						<div className="zy-ex__grid">
							<Field
								id={`${uid}-sets`}
								label="Series"
								value={draft.sets}
								onChange={update('sets')}
								error={errors.sets}
								inputMode="numeric"
							/>
							<Field
								id={`${uid}-reps`}
								label="Reps"
								value={draft.reps}
								onChange={update('reps')}
								error={errors.reps}
								inputMode="numeric"
							/>
							<Field
								id={`${uid}-weight`}
								label="Peso (kg)"
								value={draft.weight}
								onChange={update('weight')}
								error={errors.weight}
								inputMode="decimal"
							/>
						</div>
					</div>
					<div className="zy-ex__notes">
						<Field
							id={`${uid}-notes`}
							label="Nota"
							value={draft.notes}
							onChange={update('notes')}
							multiline
							placeholder="Ej: controlar el descenso"
						/>
					</div>
					{formError && (
						<p
							className="zy-ex__form-error"
							role="alert">
							{formError}
						</p>
					)}
					<div className="zy-ex__footer">
						<CustomButton
							backgroundColor="primary"
							onClick={close}
							disabled={saving}>
							Cancelar
						</CustomButton>
						<CustomButton
							type="submit"
							//loading={saving}
							>
							{saving ? 'Guardando' : 'Guardar ejercicio'}
						</CustomButton>
					</div>
				</form>
			)}

			{confirmingDelete && (
				<div
					className="zy-ex__confirm"
					role="group"
					aria-labelledby={`${uid}-confirm`}>
					<p
						id={`${uid}-confirm`}
						className="zy-ex__confirm-text">
						¿Eliminar «{exercise.name}» de este día? Se pierden sus {setsCount}{' '}
						{setsCount === 1 ? 'serie' : 'series'} y la nota. No se puede
						deshacer.
					</p>
					{deleteError && (
						<p
							className="zy-ex__form-error"
							role="alert">
							{deleteError}
						</p>
					)}
					<div className="zy-ex__footer">
						<CustomButton
							
							backgroundColor="secondary"
							disabled={deleting}
							onClick={() => {
								setConfirmingDelete(false);
								setDeleteError(null);
								requestAnimationFrame(() => deleteBtnRef.current?.focus());
							}}>
							Cancelar
						</CustomButton>
						<CustomButton
							backgroundColor="danger"
							//loading={deleting}
							onClick={handleDelete}>
							{deleting ? 'Eliminando' : 'Eliminar ejercicio'}
						</CustomButton>
					</div>
				</div>
			)}
		</article>
	);
}
