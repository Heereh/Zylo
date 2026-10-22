import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	acquireWakeLock,
	playFinishAlert,
	releaseWakeLock,
	unlockAudio,
} from '../utils/timerAlerts';
import { formatTime } from '../utils/timerUtils';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

type TimerState = {
	status: TimerStatus;
	durationSec: number;
	/** Hora de fin (ms epoch). Solo tiene valor con status 'running': no se cuentan ticks, se compara con el reloj. */
	endAt: number | null;
	/** Tiempo restante (ms) cuando NO está corriendo. */
	remainingMs: number;
	alertOn: boolean;
	selectDuration: (seconds: number) => void;
	start: () => void;
	pause: () => void;
	resume: () => void;
	reset: () => void;
	toggleAlert: () => void;
};

const DEFAULT_SECONDS = 90;

export const useTimerStore = create<TimerState>()(
	persist(
		(set, get) => {
			const run = (ms: number) => {
				unlockAudio();
				set({ status: 'running', endAt: Date.now() + ms, remainingMs: ms });
				startTicker();
			};

			return {
				status: 'idle',
				durationSec: DEFAULT_SECONDS,
				endAt: null,
				remainingMs: DEFAULT_SECONDS * 1000,
				alertOn: true,

				selectDuration: (seconds) => {
					const { status } = get();
					if (status === 'running' || status === 'paused') return;
					set({
						status: 'idle',
						durationSec: seconds,
						remainingMs: seconds * 1000,
						endAt: null,
					});
				},
				start: () => {
					const { status, durationSec } = get();
					if (status === 'running' || status === 'paused') return;
					run(durationSec * 1000);
				},
				pause: () => {
					const { status, endAt } = get();
					if (status !== 'running') return;
					const remaining = Math.max(0, (endAt ?? Date.now()) - Date.now());
					stopTicker();
					set({ status: 'paused', endAt: null, remainingMs: remaining });
				},
				resume: () => {
					if (get().status !== 'paused') return;
					run(get().remainingMs);
				},
				reset: () => {
					stopTicker();
					set({
						status: 'idle',
						endAt: null,
						remainingMs: get().durationSec * 1000,
					});
				},
				toggleAlert: () => set((s) => ({ alertOn: !s.alertOn })),
			};
		},
		{
			name: 'zylo-rest-timer',
			partialize: ({ status, durationSec, endAt, remainingMs, alertOn }) => ({
				status,
				durationSec,
				endAt,
				remainingMs,
				alertOn,
			}),
			// Tras recargar la página: retoma el descanso si sigue vigente, o lo da por terminado sin sonar.
			onRehydrateStorage: () => (state) => {
				if (!state || state.status !== 'running') return;
				queueMicrotask(() => {
					if ((state.endAt ?? 0) <= Date.now()) finishTimer(true);
					else startTicker();
				});
			},
		},
	),
);

/* ---------- Runtime fuera de React: sigue funcionando aunque cambies de pantalla ---------- */

let ticker: ReturnType<typeof setInterval> | null = null;
let baseTitle = '';

function tick() {
	const { status, endAt } = useTimerStore.getState();
	if (status !== 'running' || endAt === null) return stopTicker();
	const remaining = endAt - Date.now();
	if (remaining <= 0) return finishTimer();
	document.title = `${formatTime(remaining)} · ${baseTitle}`;
}

function startTicker() {
	stopTicker();
	baseTitle = document.title;
	ticker = setInterval(tick, 250);
	void acquireWakeLock();
	tick();
}

function stopTicker() {
	if (ticker) clearInterval(ticker);
	ticker = null;
	if (baseTitle) {
		document.title = baseTitle;
		baseTitle = '';
	}
	void releaseWakeLock();
}

function finishTimer(silent = false) {
	const { alertOn } = useTimerStore.getState();
	stopTicker();
	useTimerStore.setState({ status: 'finished', endAt: null, remainingMs: 0 });
	if (!silent) playFinishAlert(alertOn);
}

if (typeof document !== 'undefined') {
	// El navegador libera el Wake Lock al ocultar la pestaña: se vuelve a pedir y se revisa el reloj al volver.
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState !== 'visible') return;
		if (useTimerStore.getState().status === 'running') {
			void acquireWakeLock();
			tick();
		}
	});
}
