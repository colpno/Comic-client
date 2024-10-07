type ZIndexLayerNames = 'header';

type ZIndexMap = {
  [K in ZIndexLayerNames]: number;
};

export const createZIndexes = (layers: ZIndexLayerNames[]): ZIndexMap => {
  return layers.reduce((acc, layerName, index) => {
    acc[layerName] = ++index * 100;

    return acc;
  }, {} as ZIndexMap);
};

export const Z_INDEX_LAYERS: ZIndexLayerNames[] = ['header'];
export const zIndexes = createZIndexes(Z_INDEX_LAYERS);
