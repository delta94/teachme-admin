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

export const getRandomFractionNumber = (size = 6): number => {
  const number = getRandomNumber();

  const divider = [...Array(size + 1)].map((item, index) => (index === 0 ? 1 : 0)).join('');
  const parsedDivider = parseInt(divider, 10);

  const fractionNumber = number / parsedDivider;
  const parsedFractionNumber = parseFloat(`${fractionNumber}`);

  return parseFloat(parsedFractionNumber.toFixed(size));
};
