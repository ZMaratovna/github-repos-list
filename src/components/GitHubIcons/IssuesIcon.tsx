/* eslint-disable react/react-in-jsx-scope */
export const IssuesIcon = ({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      version="1.1"
      width={size}
      className={className}
    >
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
    </svg>
  );
};
