import React from "react";

type ButtonProps = {
    variant?: "primary" | "secondary" | "danger"; // Define button styles
    size?: "sm" | "md" | "lg"; // Define button sizes
    children: React.ReactNode; // Button content
    onClick?: () => void; // Click handler
    disabled?: boolean; // Disabled state
};

const baseStyles = "rounded focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
};

const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", children, onClick, disabled = false }) => {
    const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
    }`;

    return (
        <button className={styles} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
