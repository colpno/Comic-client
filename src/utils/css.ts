/* 
  INDEX
*/
type ZIndexMap = {
  [K in ZIndexLayerNames]: number;
};
export const createZIndexes = (layers: ZIndexLayerNames[]): ZIndexMap => {
  return layers.reduce((acc, layerName, index) => {
    acc[layerName] = ++index * 100;

    return acc;
  }, {} as ZIndexMap);
};

type ZIndexLayerNames = 'header' | 'loading';
/** Values in order (first is lowest, last is highest). */
export const Z_INDEX_LAYERS: ZIndexLayerNames[] = ['header', 'loading'];
export const zIndexes = createZIndexes(Z_INDEX_LAYERS);

/* 
  HEIGHT
*/
export const heights = {
  header: '60px',
  headerMd: '80px',
};
