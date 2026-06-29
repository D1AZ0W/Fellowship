type ErrorsProps = {
  error: string;
};
export const Errors = ({ error }: ErrorsProps) => {
  return <div className="p-6 text-sm text-red-600">{error}</div>;
};
