interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
  `;

  const variants = {
    primary: `
      bg-primary-600 text-white shadow-soft
      hover:bg-primary-700 hover:shadow-medium hover:-translate-y-0.5
      active:translate-y-0 active:shadow-soft
    `,
    secondary: `
      bg-secondary-100 text-secondary-900 shadow-soft
      hover:bg-secondary-200 hover:shadow-medium hover:-translate-y-0.5
      active:translate-y-0 active:shadow-soft
    `,
    outline: `
      bg-transparent text-primary-600 border-2 border-primary-600
      hover:bg-primary-50 hover:shadow-soft hover:-translate-y-0.5
      active:translate-y-0
    `,
    ghost: `
      bg-transparent text-secondary-700
      hover:bg-secondary-100 hover:-translate-y-0.5
      active:translate-y-0
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
