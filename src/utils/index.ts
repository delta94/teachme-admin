import { getRandomString, getRandomNumber, getRandomFractionNumber } from './getRandom';

export { getRandomString, getRandomNumber, getRandomFractionNumber };

export const allPropertiesAreNull = (obj: any) => {
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== '') return false;
  }

  return true;
};
