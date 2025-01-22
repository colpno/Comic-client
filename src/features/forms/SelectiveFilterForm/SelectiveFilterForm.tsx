import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SwiperClass } from 'swiper/react';

import { Button, Form, Slider, Typography } from '~/components/index.ts';
import { CheckboxOption, FormProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import { selectiveFilterFormSchema, SelectiveFilterFormValues } from '../validationSchemas.ts';
import ExcludeFilterPanel from './components/ExcludeFilterPanel';
import IncludeFilterPanel from './components/IncludeFilterPanel.tsx';
import Navigation from './components/Navigation.tsx';

interface Props extends Omit<FormProps, 'onSubmit' | 'title' | 'validationSchema' | 'children'> {
  onSubmit: (values: SelectiveFilterFormValues) => void;
  options: CheckboxOption[];
  title: string;
}

function SelectiveFilterForm({ onSubmit, options, title, className, ...props }: Props) {
  const [panel, setPanel] = useState(0);
  const [Swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [_searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    Swiper?.slideTo(panel);
  }, [panel]);

  return (
    <Form
      {...props}
      validationSchema={selectiveFilterFormSchema}
      onSubmit={onSubmit}
      className={cn('space-y-3', className)}
    >
      {({ reset }) => (
        <>
          <div className="flex items-center justify-between">
            <Typography variant="h6">{title}</Typography>
            <Button
              variant="text"
              className="!text-primary-500"
              onClick={() => {
                setSearchParams({});
                reset();
              }}
            >
              Clear
            </Button>
          </div>
          <Navigation onChange={setPanel} />
          <Button variant="contained" type="submit" fullWidth size="small">
            Apply
          </Button>
          <Slider onSwiper={setSwiper} allowTouchMove={false}>
            <IncludeFilterPanel options={options} />
            <ExcludeFilterPanel options={options} />
          </Slider>
        </>
      )}
    </Form>
  );
}

export default SelectiveFilterForm;
export type { SelectiveFilterFormValues } from '../validationSchemas.ts';
