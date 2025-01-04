import { v4 } from 'uuid';

import { Typography } from '~/components/index.ts';
import { EMAIL_HELPER } from '~/constants/commonConstants.ts';

const contacts = [{ label: 'Helper email', value: EMAIL_HELPER }];

function ContactList() {
  return (
    <table className="[&>*>*:last-child]:!text-primary-500 [&>*>*:last-child]:!font-semibold [&_td]:!max-w-48 [&_td]:mx-2">
      {contacts.map(({ label, value }) => (
        <tr key={v4()}>
          <Typography component="td" textAlign="end">
            {label}:
          </Typography>
          <Typography copyable component="td">
            {value}
          </Typography>
        </tr>
      ))}
    </table>
  );
}

interface Props {
  message?: string;
}

function UnknownErrorPage({ message }: Props) {
  const copyDateTime = () => {
    const dateTime = new Date().toLocaleString();
    navigator.clipboard.writeText(dateTime);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 h-dvh">
      <Typography variant="h5" maxWidth={1000}>
        An unknown error occurred. Please try again later or contact administrators about the issue.
      </Typography>
      <ContactList />
      <Typography maxWidth={600} textAlign="center">
        (Please include the{' '}
        <Typography component="strong" copyable>
          error message
        </Typography>{' '}
        below, current{' '}
        <Typography component="strong" copyable onClick={copyDateTime}>
          date and time
        </Typography>
        , <strong>how did you get the issue</strong> when contacting administrators.)
      </Typography>
      <Typography variant="h6" textAlign="justify" maxWidth={1000}>
        Error message: {message}
      </Typography>
    </div>
  );
}

export default UnknownErrorPage;
