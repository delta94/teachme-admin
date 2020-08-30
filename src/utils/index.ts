export * from './getRandom';
export * from './wmMessage';
export * from './date';
export * from './publish-status';

export const pluralizer = (word: string, count: number): string =>
  count === 1 ? word : `${word}s`;

export const isValidNumber = (value: any): boolean => typeof value === 'number' && isFinite(value);

export const isNumericValue = (value: string): boolean => {
  const reg = /^-?\d*(\.\d*)?$/;
  return (!isNaN(parseInt(value)) && reg.test(value)) || value === '' || value === '-';
};

export const getValidRangeNumber = (value: string, start = 0, end = 100): number =>
  value === '' || value === '-' ? start : parseInt(value) > end ? end : parseInt(value);

export const fieldErrorMessage = (
  fieldValue: string,
  error = 'This field cannot be empty',
): string | undefined => (fieldValue === '' ? error : undefined);
