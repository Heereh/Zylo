import type { ReactNode } from 'react';
import './ExerciseList.css';

/** Lista a ancho completo. El ancho no depende del contenedor padre. */
export function ExerciseList({ children }: { children: ReactNode }) {
	return <div className="zy-ex-list" role="list">{children}</div>;
}
