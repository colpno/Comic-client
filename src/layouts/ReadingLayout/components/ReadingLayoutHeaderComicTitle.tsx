import { Typography } from '~/components/index.ts';
import { getComicRoute } from '~/constants/routeConstants.ts';

function ReadingLayoutHeaderComicTitle({ text }: { text: string }) {
  return (
    <div className="line-clamp-1 w-[100px] md:w-[180px] lg:w-[200px]">
      <Typography href={getComicRoute(text)} title={text} fontWeight={600}>
        {text}
      </Typography>
    </div>
  );
}

export default ReadingLayoutHeaderComicTitle;
