const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const getRandomString = (size = 6): string =>
  [...Array(size)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
