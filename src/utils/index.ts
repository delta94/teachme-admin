export * from './getRandom';
export * from './wmMessage';
export * from './date';

export const pluralizer = (word: string, count: number): string =>
  count === 1 ? word : `${word}s`;
