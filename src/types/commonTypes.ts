/** Alteration of default Omit which doesn't provide suggestion. */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PrimitiveValue = string | number | boolean;

export type Device = 'mobile' | 'tablet' | 'desktop';
