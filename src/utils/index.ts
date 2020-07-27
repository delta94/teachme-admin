import { getRandomString, getRandomNumber, getRandomFractionNumber } from './getRandom';
import { getValidDateRange, defaultDateRange } from './date';

export {
  getRandomString,
  getRandomNumber,
  getRandomFractionNumber,
  getValidDateRange,
  defaultDateRange,
};

export const allPropertiesAreNull = (obj: any) => {
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== '') return false;
  }

  return true;
};

export const propsAreEqual = (first: any, second: any): boolean =>
  JSON.stringify(first) === JSON.stringify(second);
