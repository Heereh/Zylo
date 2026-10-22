import type { ReactNode } from 'react';
import './DayGrid.css';

/** Cuadrícula de días: 1 columna en móvil, tantas como quepan en escritorio. */
export function DayGrid({ children }: { children: ReactNode }) {
	return <div className="zy-day-grid">{children}</div>;
}
