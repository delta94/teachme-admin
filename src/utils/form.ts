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
