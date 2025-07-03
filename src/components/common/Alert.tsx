interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  className?: string;
}

const Alert = ({ children, variant = 'info', className = '' }: AlertProps) => {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div 
      className={`
        ${variants[variant]} 
        border px-4 py-3 rounded-xl text-sm font-medium animate-slide-up
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        <span>{icons[variant]}</span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Alert;
