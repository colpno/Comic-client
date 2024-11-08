interface Props {
  message?: string;
}

function UnknownError({ message }: Props) {
  return (
    <div>
      <span>{message}</span>
    </div>
  );
}

export default UnknownError;
