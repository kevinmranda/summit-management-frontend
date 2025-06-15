interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className = '', ...props }: ButtonProps) => (
  <button
    className={`
      px-4 py-2 rounded-xl font-semibold text-white
      bg-white/10 backdrop-blur-md border border-white/20 shadow-md
      hover:bg-white/20 hover:shadow-lg
      focus:outline-none focus:ring-2 focus:ring-cyan-300
      disabled:opacity-50 disabled:cursor-not-allowed
      transition duration-200 ease-in-out
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
