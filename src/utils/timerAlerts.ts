let audioCtx: AudioContext | null = null;
let wakeLock: WakeLockSentinel | null = null;

/** Llamar dentro de un click: el navegador solo permite sonido posterior si hubo un gesto del usuario. */
export const unlockAudio = (): void => {
	try {
		const Ctx =
			window.AudioContext ??
			(window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
		if (!Ctx) return;
		audioCtx ??= new Ctx();
		if (audioCtx.state === 'suspended') void audioCtx.resume();
	} catch {
		/* sin audio disponible */
	}
};

const beep = (ctx: AudioContext, startAt: number, frequency: number): void => {
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = 'sine';
	osc.frequency.value = frequency;
	gain.gain.setValueAtTime(0.0001, startAt);
	gain.gain.exponentialRampToValueAtTime(0.25, startAt + 0.02);
	gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.25);
	osc.connect(gain).connect(ctx.destination);
	osc.start(startAt);
	osc.stop(startAt + 0.3);
};

/** Sonido + vibración (la vibración no existe en iOS Safari; se ignora ahí). */
export const playFinishAlert = (enabled: boolean): void => {
	if (!enabled) return;
	try {
		const ctx = audioCtx;
		if (ctx) {
			const t = ctx.currentTime;
			[0, 0.35, 0.7].forEach((delay) => beep(ctx, t + delay, 880));
		}
		navigator.vibrate?.([200, 100, 200]);
	} catch {
		/* ignorar */
	}
};

/** Mantiene la pantalla encendida mientras corre el temporizador (si el navegador lo permite). */
export const acquireWakeLock = async (): Promise<void> => {
	try {
		if (!('wakeLock' in navigator) || wakeLock) return;
		wakeLock = await navigator.wakeLock.request('screen');
		wakeLock.addEventListener('release', () => {
			wakeLock = null;
		});
	} catch {
		/* no soportado o denegado */
	}
};

export const releaseWakeLock = async (): Promise<void> => {
	try {
		await wakeLock?.release();
	} catch {
		/* ignorar */
	}
	wakeLock = null;
};
