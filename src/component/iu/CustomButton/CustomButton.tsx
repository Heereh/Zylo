import React from "react";
import "./CustomButton.css";

interface CustomButtonProps {
  size?: "small" | "mediun" | "large";
  backgroundColor?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "neutral"
    | "success"
    | "custom";
  appearance?: "solid" | "outline" | "ghost";
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  size = "small",
  backgroundColor = "primary",
  appearance = "solid",
  children,
  type = "button",
  onClick,
  disabled,
  icon,
  iconPosition = "start",
}) => {
  const className = `custom-button ${size} ${backgroundColor} ${appearance}`;
  const startContent =
    icon && iconPosition === "start" ? (
      <span className="custom-button__content">{icon}</span>
    ) : null;

  const endContent =
    icon && iconPosition === "end" ? (
      <span className="custom-button__content">{icon}</span>
    ) : null;
  return (
    <button
      className={className}
      type={type}
      onClick={onClick} //
      disabled={disabled}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  );
};

export default CustomButton;
