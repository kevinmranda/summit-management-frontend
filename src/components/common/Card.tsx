interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}: CardProps) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseClasses = `
    bg-white rounded-2xl border border-secondary-200 shadow-soft
    transition-all duration-200 ease-in-out
    ${paddingClasses[padding]}
  `;

  const hoverClasses = hover 
    ? 'hover:shadow-medium hover:-translate-y-1 cursor-pointer' 
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
