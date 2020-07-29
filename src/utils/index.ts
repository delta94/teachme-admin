export * from './getRandom';
export * from './wmMessage';
export * from './date';

export const allPropertiesAreExist = (obj: any) => {
  for (const key in obj) {
    return !obj[key] && obj[key] !== null && obj[key] !== '';
  }

  return Boolean(obj);
};

export const propsAreEqual = (first: any, second: any): boolean =>
  JSON.stringify(first) === JSON.stringify(second);
