export function Badge({ children, className = "" }) {
  return (
    <span className={`px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold ${className}`}>
      {children}
    </span>
  );
}
