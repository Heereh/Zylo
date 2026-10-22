import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'zylo-theme';
const THEME_COLOR: Record<Theme, string> = { light: '#f5f0e8', dark: '#211f1c' };

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

const getStored = (): Theme | null => {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return value === 'light' || value === 'dark' ? value : null;
	} catch {
		return null;
	}
};

const systemTheme = (): Theme =>
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const apply = (theme: Theme) => {
	document.documentElement.dataset.theme = theme;
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
};

/** La fuente de verdad es el atributo data-theme de <html> (lo fija el script de index.html antes del primer render). */
const getSnapshot = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

if (typeof document !== 'undefined') {
	// Respaldo por si index.html no tiene el script inicial.
	if (!document.documentElement.dataset.theme) apply(getStored() ?? systemTheme());

	// Sin elección guardada, la app sigue al sistema.
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (getStored()) return;
		apply(systemTheme());
		emit();
	});

	// Sincroniza entre pestañas.
	window.addEventListener('storage', (e) => {
		if (e.key !== STORAGE_KEY) return;
		apply(getStored() ?? systemTheme());
		emit();
	});
}

export function useTheme() {
	const theme = useSyncExternalStore(subscribe, getSnapshot, (): Theme => 'light');

	const setTheme = useCallback((next: Theme) => {
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			/* modo privado: el cambio vale solo para esta sesión */
		}
		apply(next);
		emit();
	}, []);

	const toggleTheme = useCallback(() => setTheme(getSnapshot() === 'dark' ? 'light' : 'dark'), [setTheme]);

	return { theme, isDark: theme === 'dark', setTheme, toggleTheme };
}
