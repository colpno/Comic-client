import { ImgHTMLAttributes, memo } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type ImageAsLazyImageProps = {
  lazy: boolean;
} & LazyLoadImageProps;

type ImageAsImageProps = {
  lazy?: never;
} & ImgHTMLAttributes<HTMLImageElement>;

type Props = ImageAsImageProps | ImageAsLazyImageProps;

/**
 * @param lazy if set to true and there is a set of Image, use HOC trackWindowScroll on the common component.
 */
function Component({ src, lazy, ...imgProps }: Props) {
  if (lazy) {
    return <LazyLoadImage {...imgProps} src={src} effect="blur" />;
  }

  return <img src={src} {...imgProps} />;
}

const Image = memo(Component);

export default Image;
