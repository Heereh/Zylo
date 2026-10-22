import type { SVGProps } from 'react';

/* Íconos mínimos (trazo 1.75, 20 px). Si el proyecto ya tiene librería de íconos,
   reemplazá estas importaciones por las de esa librería manteniendo tamaño y grosor. */
const base: SVGProps<SVGSVGElement> = {
	width: 20,
	height: 20,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 1.75,
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	'aria-hidden': true,
	focusable: false,
};

export const ChevronDownIcon = (p: SVGProps<SVGSVGElement>) => (
	<svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const ChevronRightIcon = (p: SVGProps<SVGSVGElement>) => (
	<svg {...base} {...p}><path d="m9 6 6 6-6 6" /></svg>
);
export const TrashIcon = (p: SVGProps<SVGSVGElement>) => (
	<svg {...base} {...p}>
		<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
	</svg>
);
export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
	<svg {...base} {...p}><path d="m5 12 5 5 9-10" /></svg>
);
export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
	<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
