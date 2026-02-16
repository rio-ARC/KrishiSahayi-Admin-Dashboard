interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loading = ({ size = 'md', text }: LoadingProps) => {
  const sizeClasses = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-14 w-14' };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-b-2 border-green-600 ${sizeClasses[size]}`} />
      {text && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
};

export default Loading;