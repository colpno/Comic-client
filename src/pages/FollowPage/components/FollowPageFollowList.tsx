import { Image, Typography } from '~/components/index.ts';
import { FollowComicCard } from '~/features/index.ts';
import { noFollowSVG } from '~/images/index.ts';
import { Comic, Follow } from '~/types/index.ts';

interface Props {
  items: Follow<Comic>[];
  onRemoveClick: (id: string) => void;
}

function FollowPageFollowList({ items, onRemoveClick }: Props) {
  if (items.length === 0) {
    return (
      <div>
        <Image src={noFollowSVG} alt="No follows image" className="mx-auto mt-8 max-w-56" />
        <Typography textAlign="center" variant="h6">
          There are no follows yet.
        </Typography>
      </div>
    );
  }

  return (
    <section className="space-y-6 sm:space-y-4">
      {items.map((follow) => (
        <FollowComicCard key={follow.id} item={follow} onRemove={() => onRemoveClick(follow.id)} />
      ))}
    </section>
  );
}

export default FollowPageFollowList;
