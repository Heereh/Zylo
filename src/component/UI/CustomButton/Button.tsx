import React, { forwardRef } from 'react';
import './CustomButton.css';

type BaseProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	'children'
> & {
	size?: 'small' | 'medium' | 'large';
	backgroundColor?:
		| 'default'
		| 'primary'
		| 'secondary'
		| 'danger'
		| 'neutral'
		| 'success'
		| 'custom';
	appearance?: 'solid' | 'outline' | 'ghost';
	icon?: React.ReactNode;
	iconPosition?: 'start' | 'end';
	/** Muestra un spinner, deshabilita el botón y marca aria-busy. */
	loading?: boolean;
	fullWidth?: boolean;
};

type CustomButtonProps = BaseProps &
	(
		| { iconOnly?: false; children: React.ReactNode }
		// Botón solo de ícono: el nombre accesible es obligatorio.
		| {
				iconOnly: true;
				'aria-label': string;
				icon: React.ReactNode;
				children?: never;
		  }
	);

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
	function CustomButton(props, ref) {
		const {
			size = 'small',
			backgroundColor = 'primary',
			appearance = 'solid',
			type = 'button',
			icon,
			iconPosition = 'start',
			iconOnly = false,
			loading = false,
			fullWidth = false,
			className,
			children,
			disabled,
			title,
			...rest
		} = props;

		const classes = [
			'custom-button',
			size,
			backgroundColor,
			appearance,
			iconOnly && 'icon-only',
			fullWidth && 'full-width',
			className,
		]
			.filter(Boolean)
			.join(' ');

		const iconNode = icon ? (
			<span className="custom-button__content">{icon}</span>
		) : null;
		const leading = loading ? (
			<span
				className="custom-button__spinner"
				aria-hidden="true"
			/>
		) : iconPosition === 'start' ? (
			iconNode
		) : null;
		const trailing = !loading && iconPosition === 'end' ? iconNode : null;

		return (
			<button
				ref={ref}
				type={type}
				className={classes}
				disabled={disabled || loading}
				aria-busy={loading || undefined}
				title={title ?? (iconOnly ? props['aria-label'] : undefined)}
				{...rest}>
				{leading}
				{!iconOnly && children}
				{trailing}
			</button>
		);
	},
);

export default Button;
