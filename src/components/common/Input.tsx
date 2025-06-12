interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, className = '', ...props }: InputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      className={`mt-1 p-2 border rounded w-full ${className}`}
      {...props}
    />
  </div>
);

export default Input;