import { GrFormNextLink } from 'react-icons/gr';

import {
  generateTableActionsColDef,
  Image,
  TableActionButton,
  TableColsDef,
  Typography,
} from '~/components/index.ts';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { placeholderImage } from '~/images/index.ts';
import { Chapter } from '~/types/chapterType.ts';
import { Comic } from '~/types/comicType.ts';
import { toDate } from '~/utils/converters.ts';

export const getTableDef = (): TableColsDef => [
  {
    field: 'comic',
    headerName: 'Title',
    flex: 2,
    renderCell: ({ value }) => {
      const comic = value as Comic;
      return (
        <div className="flex items-center h-full gap-3">
          <Image
            src={placeholderImage}
            alt={comic.title}
            className="w-7 aspect-[8/11]"
            onLoad={({ currentTarget }) => {
              currentTarget.src = comic.coverImageUrl;
            }}
            onError={({ currentTarget }) => {
              currentTarget.src = placeholderImage;
            }}
          />
          <Typography>{comic.title}</Typography>
        </div>
      );
    },
  },
  {
    field: 'chapter',
    type: 'number',
    headerName: 'Chapter',
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ value }) => {
      const chapter = value as Chapter;
      return chapter.chapter;
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
      const comic = row.comic as Comic;
      const chapter = row.chapter as Chapter;

      const getNextChapterLink = () => {
        const nextChapterNumber =
          comic.lastChapter && chapter.chapter && comic.lastChapter > chapter.chapter
            ? chapter.chapter + 1
            : -1; // to prevent the link from being generated
        const nextChapterLink = getComicReadingRoute(comic.title, nextChapterNumber);
        return nextChapterLink;
      };

      const disableNext =
        !comic.lastChapter || !chapter.chapter || comic.lastChapter <= chapter.chapter;

      return [
        <TableActionButton
          label="Read next"
          icon={<GrFormNextLink className="text-2xl" />}
          disabled={disableNext}
          href={getNextChapterLink()}
        />,
      ];
    },
  }),
];
