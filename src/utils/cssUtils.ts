/* 
  INDEX
*/
type ZIndexLayerName = string;
type ZIndexMap = Record<ZIndexLayerName, number>;

const createZIndexes = (layers: ZIndexLayerName[]): ZIndexMap => {
  return layers.reduce((acc, layerName, index) => {
    acc[layerName] = ++index * 100;

    return acc;
  }, {} as ZIndexMap);
};

/** Values in order (first is lowest, last is highest). */
const Z_INDEX_LAYERS: ZIndexLayerName[] = ['header', 'loading'];

export const zIndexes = createZIndexes(Z_INDEX_LAYERS);

/* 
  HEIGHT
*/
export const heights: Record<string, string> = {
  header: '60px',
  headerMd: '80px',
};
