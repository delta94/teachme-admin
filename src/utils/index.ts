export * from './getRandom';
export * from './wmMessage';
export * from './date';
export * from './publish-status';

export const pluralizer = (word: string, count: number): string =>
  count === 1 ? word : `${word}s`;

export const isValidNumber = (value: any): boolean => typeof value === 'number' && isFinite(value);
