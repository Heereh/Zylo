export const MIN_SECONDS = 5;
export const MAX_SECONDS = 60 * 60;
export const PRESETS = [30, 60, 90, 120, 180] as const;

/** ms → "mm:ss" (redondea hacia arriba para no mostrar 00:00 antes de terminar). */
export const formatTime = (ms: number): string => {
	const total = Math.max(0, Math.ceil(ms / 1000));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/** 30 → "30 s", 120 → "2 min", 105 → "1:45". */
export const formatPreset = (seconds: number): string => {
	if (seconds < 60) return `${seconds} s`;
	if (seconds % 60 === 0) return `${seconds / 60} min`;
	return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

/** "90" → 90 s · "1:45" → 105 s · null si no es válido o está fuera de rango. */
export const parseDuration = (raw: string): number | null => {
	const value = raw.trim();
	let seconds: number;
	if (/^\d+$/.test(value)) {
		seconds = Number(value);
	} else {
		const match = /^(\d{1,2}):([0-5]\d)$/.exec(value);
		if (!match) return null;
		seconds = Number(match[1]) * 60 + Number(match[2]);
	}
	return seconds >= MIN_SECONDS && seconds <= MAX_SECONDS ? seconds : null;
};
