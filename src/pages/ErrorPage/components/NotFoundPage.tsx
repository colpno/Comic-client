import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { MdExpandMore } from 'react-icons/md';
import { ErrorResponse, useNavigate } from 'react-router-dom';

import Image from '~/components/Image.tsx';
import { Button } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { ROUTE_HOME } from '~/constants/routeConstants.ts';
import { noDataSVG } from '~/images/index.ts';
import { BasicLayout } from '~/layouts/index.ts';

interface Props {
  error?: ErrorResponse;
  title?: string;
}

function NotFoundPage({ error, title = 'Uh oh! You got lost.' }: Props) {
  const navigate = useNavigate();

  return (
    <BasicLayout className="flex flex-col items-center justify-center px-2 space-y-3 -translate-y-8">
      <Image src={noDataSVG} alt="Page not found" className="mt-4" />
      <Typography variant="h2">{title}</Typography>
      <div className="space-x-2 !mb-4">
        <Button href={ROUTE_HOME}>Go to home</Button>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
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
    </BasicLayout>
  );
}

export default NotFoundPage;
