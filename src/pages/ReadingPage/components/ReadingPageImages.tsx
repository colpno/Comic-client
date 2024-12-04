import Image from '~/components/Image.tsx';
import { Chapter } from '~/types/chapterType.ts';

interface Props {
  id: Chapter['id'];
  images: Chapter['content'];
}

function ReadingPageImages({ images, id }: Props) {
  return images.map((img, i) => (
    <Image
      src={img.dataSaver || img.data}
      onLoad={({ currentTarget }) => (currentTarget.src = img.data)}
      alt={`Image ${i + 1}`}
      className="w-full md:w-[728px]"
      key={`${id}-image-${i + 1}`}
    />
  ));
}

export default ReadingPageImages;
