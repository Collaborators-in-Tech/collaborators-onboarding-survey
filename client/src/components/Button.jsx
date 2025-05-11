import "../styles/button.css";

const Button = ({
    type = 'button',
    onClick,
    children,
    className = '',
    disabled = false,
    variant = 'orange'
}) => {
    // const baseClasses = 'px-4 py-2 rounded text-black  ';
    const baseClasses = "baseClass";
    const buttonColors = {
        yellow: '#F6B812',
        orange: '#EA703D',
        purple: '#7970AC',
        gray: '#CDCDCD'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={{ backgroundColor: buttonColors[variant] }}
            className={`${baseClasses} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;