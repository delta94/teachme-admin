export * from './getRandom';
export * from './wmMessage';
export * from './date';

export const isNotEmpty = (item: any): boolean => Boolean(item);

export const allPropertiesAreExist = (obj: any) => {
  if (obj.constructor === Object && Object.keys(obj).length) {
    for (const key in obj) {
      return !isNotEmpty(obj[key]);
    }
  }

  return !isNotEmpty(obj);
};

export const propsAreEqual = (first: any, second: any): boolean =>
  JSON.stringify(first) === JSON.stringify(second);

export const pluralizer = (word: string, count: number): string => (count > 1 ? `${word}s` : word);
