import { FollowComicCard, FollowComicCardProps } from '~/features/index.ts';

interface Props {
  items: FollowComicCardProps['item'][];
  onRemoveClick: (id: string) => void;
}

function FollowPageFollowList({ items, onRemoveClick }: Props) {
  return (
    <section className="space-y-6 sm:space-y-4">
      {items.map((follow) => (
        <FollowComicCard key={follow.id} item={follow} onRemove={() => onRemoveClick(follow.id)} />
      ))}
    </section>
  );
}

export default FollowPageFollowList;
