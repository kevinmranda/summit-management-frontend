interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, className = '', ...props }: InputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-white/90 mb-1">
      {label}
    </label>
    <input
      className={`
        w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white/90
        placeholder-white/50
        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
        transition duration-200 ease-in-out
        ${className}
      `}
      {...props}
    />
  </div>
);

export default Input;
