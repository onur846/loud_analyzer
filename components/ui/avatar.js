export function Avatar({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full w-10 h-10 object-cover ${className}`}
    />
  );
}
