export * from './getRandom';
export * from './wmMessage';

export const allPropertiesAreNull = (obj: any) => {
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== '') return false;
  }

  return true;
};

export const propsAreEqual = (first: any, second: any): boolean =>
  JSON.stringify(first) === JSON.stringify(second);
