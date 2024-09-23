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

export type ImageProps = ImageAsImageProps | ImageAsLazyImageProps;

function Image({ lazy, loading = 'lazy', decoding = 'async', ...imgProps }: ImageProps) {
  if (lazy) {
    return (
      <LazyLoadImage
        {...imgProps}
        effect="blur"
        placeholderSrc={PlaceholderImage}
        loading={loading}
        decoding={decoding}
      />
    );
  }

  return <img {...imgProps} loading={loading} decoding={decoding} />;
}

export default memo(Image);
