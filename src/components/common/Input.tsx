interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const Input = ({ label, error, helperText, className = '', ...props }: InputProps) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-secondary-700 mb-2">
      {label}
    </label>
    <input
      className={`
        w-full px-4 py-3 rounded-xl bg-white border-2 text-secondary-900
        placeholder-secondary-400 shadow-soft
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
        hover:shadow-medium
        ${error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
          : 'border-secondary-200 focus:border-primary-500'
        }
        ${className}
      `}
      {...props}
    />
    {error && (
      <p className="mt-2 text-sm text-red-600 animate-slide-up">
        {error}
      </p>
    )}
    {helperText && !error && (
      <p className="mt-2 text-sm text-secondary-500">
        {helperText}
      </p>
    )}
  </div>
);

export default Input;
