/** Alteration of default Omit which doesn't suggest keys */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
