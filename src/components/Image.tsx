import { ImgHTMLAttributes, memo } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { PlaceholderImage } from '~/images/index.ts';

interface ImageAsLazyImageProps extends LazyLoadImageProps {
  /** If true, and there is a set of this components, the common parent should be wrapped with HOC trackWindowScroll. */
  lazy: boolean;
}

interface ImageAsImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  lazy?: never;
}

type Props = ImageAsImageProps | ImageAsLazyImageProps;

function Image({ lazy, ...imgProps }: Props) {
  if (lazy) {
    return <LazyLoadImage {...imgProps} effect="blur" placeholderSrc={PlaceholderImage} />;
  }

  return <img {...imgProps} />;
}

export default memo(Image);
