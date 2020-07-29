const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const digitChars = '0123456789';

export const getRandomString = (size = 6): string =>
  [...Array(size)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');

export const getRandomNumber = (size = 6): number => {
  const numberString = [...Array(size)]
    .map(() => digitChars.charAt(Math.floor(Math.random() * digitChars.length)))
    .join('');
  return parseInt(numberString, 10);
};

export const getRandomNegativeNumber = (size = 6): number => getRandomNumber() * -1;
