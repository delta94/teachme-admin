export * from './getRandom';
export * from './wmMessage';
export * from './date';
export * from './publish-status';
export * from './form';

export const pluralizer = (word: string, count: number): string =>
  count === 1 ? word : `${word}s`;

export const isValidNumber = (value: any): boolean => typeof value === 'number' && isFinite(value);

export const isNaturalNumber = (n: any): boolean => {
  n = n.toString(); // force the value incase it is not
  const n1 = Math.abs(n),
    n2 = parseInt(n, 10);
  return !isNaN(n1) && n2 === n1 && n1.toString() === n;
};
