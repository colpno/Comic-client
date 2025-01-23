import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { MdExpandMore } from 'react-icons/md';
import { ErrorResponse, useNavigate } from 'react-router-dom';

import Image from '~/components/Image.tsx';
import { Button } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { EMAIL_HELPER } from '~/constants/commonConstants.ts';
import { ROUTE_HOME } from '~/constants/routeConstants.ts';
import { noDataSVG } from '~/images/index.ts';
import Header from '~/layouts/components/Header.tsx';

interface Props {
  error?: ErrorResponse;
  title?: string;
}

function NotFoundPage({ error, title = 'Uh oh! You got lost.' }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-2 space-y-3 -translate-y-8 pt-header md:pt-header-md">
        <Image src={noDataSVG} alt="Page not found" className="mt-4" />
        <Typography variant="h2">{title}</Typography>
        <div className="space-x-2 !mb-4">
          <Button href={ROUTE_HOME}>Go to home</Button>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
        <Typography variant="body2" className="text-center">
          If you have any questions, please contact us via{' '}
          <Typography component="span" variant="inherit" copyable>
            {EMAIL_HELPER}
          </Typography>
          .
        </Typography>
        {error && (
          <div className="max-w-[400px]">
            <Accordion>
              <AccordionSummary expandIcon={<MdExpandMore />}>
                <Typography variant="h6" className="line-clamp-1">
                  Detail: {error.status}, {error.statusText}.
                </Typography>
              </AccordionSummary>
              <AccordionDetails>{error.data}</AccordionDetails>
            </Accordion>
          </div>
        )}
        <Helmet>
          <title>404 - Comic</title>
        </Helmet>
      </main>
    </div>
  );
}

export default NotFoundPage;
