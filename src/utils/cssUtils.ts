import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ZIndexLayerName = string;
type ZIndexMap = Record<ZIndexLayerName, number>;

const createZIndexes = (layers: ZIndexLayerName[]): ZIndexMap => {
  return layers.reduce((acc, layerName, index) => {
    acc[layerName] = ++index * 100;

    return acc;
  }, {} as ZIndexMap);
};

/** Values in order (first is lowest, last is highest). */
const Z_INDEX_LAYERS: ZIndexLayerName[] = [
  'slider-navigators',
  'home-page-banner-blurred-layout',
  'home-page-banner-images',
  'home-page-banner-shadow',
  'home-page-banner-caption',
  'header',
  'loading',
];

export const zIndexes = createZIndexes(Z_INDEX_LAYERS);

export const heights: Record<string, string> = {
  header: '60px',
  'header-md': '80px',
  'banner-home': '480px',
};

export const cn = (...classNames: ClassValue[]) => {
  return twMerge(clsx(...classNames));
};
