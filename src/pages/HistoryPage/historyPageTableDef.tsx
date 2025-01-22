import { GrFormNextLink } from 'react-icons/gr';

import {
  generateTableActionsColDef,
  Image,
  Popup,
  TableActionButton,
  Typography,
} from '~/components/index.ts';
import { getComicReadingRoute, getComicRoute } from '~/constants/routeConstants.ts';
import { usePopup } from '~/hooks/usePopup.ts';
import { placeholderImage } from '~/images/index.ts';
import { Comic, History, TableColsDef } from '~/types/index.ts';
import { toDate } from '~/utils/converters.ts';

export const getTableDef = (): TableColsDef => [
  {
    field: 'comic',
    headerName: 'Title',
    flex: 2,
    renderCell: ({ value }) => {
      const { title, coverImageUrl } = value as Comic;
      const { closePopup, open, openPopup, popupRef } = usePopup();
      return (
        <div className="flex items-center h-full gap-3 font-semibold">
          <Image
            src={placeholderImage}
            alt={title}
            className="w-7 aspect-[8/11]"
            onLoad={({ currentTarget }) => {
              currentTarget.src = coverImageUrl;
            }}
            onError={({ currentTarget }) => {
              currentTarget.src = placeholderImage;
            }}
            onPointerEnter={openPopup}
            onTouchEnd={openPopup}
          />
          <Popup
            open={open}
            onClose={closePopup}
            anchorEl={popupRef}
            position={{ vertical: 'center' }}
          >
            <Image src={coverImageUrl} alt={title} className="w-32 md:w-48 aspect-[8/11]" />
          </Popup>
          <Typography href={getComicRoute(title)} title="Go to the comic page">
            {title}
          </Typography>
        </div>
      );
    },
  },
  {
    field: 'chapterNumber',
    type: 'number',
    headerName: 'Chapter',
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => {
      const { comic, chapterNumber } = row as History;
      return (
        <div className="flex items-center justify-center h-full font-semibold">
          <Typography
            href={getComicReadingRoute(comic.title, chapterNumber)}
            title={`Go to chapter ${chapterNumber}`}
          >
            {chapterNumber}
          </Typography>
        </div>
      );
    },
  },
  {
    field: 'readAt',
    type: 'dateTime',
    valueFormatter: (value) => toDate(value, 'MM/DD/YYYY, LT'),
    headerName: 'Read at',
    flex: 1,
    editable: true,
  },
  generateTableActionsColDef({
    render: ({ row }) => {
      const { nextChapter } = row as History;
      return [
        <TableActionButton
          label="Read next"
          icon={<GrFormNextLink className="text-2xl" />}
          disabled={nextChapter === undefined}
          href={nextChapter}
        />,
      ];
    },
  }),
];
