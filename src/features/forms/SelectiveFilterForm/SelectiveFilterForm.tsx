import { useEffect, useState } from 'react';
import { SwiperClass } from 'swiper/react';

import { Button, Form, Slider, Typography } from '~/components/index.ts';
import { CheckboxOption } from '~/types/formControlTypes.ts';
import { selectiveFilterFormSchema, SelectiveFilterFormValues } from '../validationSchemas.ts';
import ExcludeFilterPanel from './components/ExcludeFilterPanel';
import IncludeFilterPanel from './components/IncludeFilterPanel.tsx';
import Navigation from './components/Navigation.tsx';

interface Props {
  onSubmit: (values: SelectiveFilterFormValues) => void;
  options: CheckboxOption[];
  title: string;
}

function SelectiveFilterForm({ onSubmit, options, title }: Props) {
  const [panel, setPanel] = useState(0);
  const [Swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    Swiper?.slideTo(panel);
  }, [panel]);

  return (
    <Form validationSchema={selectiveFilterFormSchema} onSubmit={onSubmit} className="space-y-3">
      {({ reset }) => (
        <>
          <div className="flex items-center justify-between">
            <Typography variant="h6">{title}</Typography>
            <Button variant="text" className="!text-primary" onClick={() => reset()}>
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
