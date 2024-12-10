import { Container } from '@mui/material';
import moment from 'moment';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';
import { RiCalendarTodoFill, RiFlagLine } from 'react-icons/ri';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';

import { Button, Slider } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import {
  getDailyRoute,
  ROUTE_COMPLETED,
  ROUTE_NEW_ARRIVALS,
  ROUTE_RANKING,
} from '~/constants/routeConstants.ts';

interface MenuItemProps {
  Icon: IconType;
  label: string;
  href: string;
}

function MenuItem({ Icon, label, href }: MenuItemProps) {
  return (
    <Button as="unstyled" href={href} className="flex flex-col items-center">
      <div className="flex items-center justify-center bg-slate-100 rounded-full size-16 md:size-[4.6rem]">
        <Icon className="text-2xl md:text-3xl" />
      </div>
      <Typography className="mt-2">{label}</Typography>
    </Button>
  );
}

function Menu() {
  const items: MenuItemProps[] = [
    {
      Icon: VscGitPullRequestNewChanges,
      label: 'New Arrivals',
      href: ROUTE_NEW_ARRIVALS,
    },
    {
      Icon: RiCalendarTodoFill,
      label: 'Daily',
      href: getDailyRoute(moment().format('dddd').toLowerCase()),
    },
    {
      Icon: HiOutlineTrophy,
      label: 'Ranking',
      href: ROUTE_RANKING,
    },
    {
      Icon: RiFlagLine,
      label: 'Completed',
      href: ROUTE_COMPLETED,
    },
  ];

  return (
    <div className="mt-5 mb-8 border-b">
      <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
        <Slider
          slidesPerView={3}
          breakpoints={{
            512: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 6,
            },
          }}
          centerInsufficientSlides
          centerSlideContent
          spaceBetween={16}
          className="pb-4 overflow-x-scroll md:overflow-x-hidden"
        >
          {items.map((item) => (
            <MenuItem key={`menu-${item.label}`} {...item} />
          ))}
        </Slider>
      </Container>
    </div>
  );
}

export default Menu;
