import { BooleanStringOption, BooleanNumberOption, BitBoolean } from '@walkme/types';

export const convertToStringBoolean = (val: boolean): BooleanStringOption =>
  val ? BooleanStringOption.TRUE : BooleanStringOption.FALSE;

export const convertToNumberBoolean = (val: boolean): BooleanNumberOption =>
  val ? BooleanNumberOption.TRUE : BooleanNumberOption.FALSE;

export function isTrue(val?: BitBoolean) {
  return val === BooleanStringOption.TRUE || val === BooleanNumberOption.TRUE;
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function join<T, S>(arr1: T[], arr2: S[], prop1: string, prop2: string): (T & S)[] {
  console.time('join');
  const joined: (T & S)[] = [];
  const map1: any = {};
  arr1.forEach((item) => {
    //@ts-ignore
    const key = item[prop1].toString();
    map1[key] = item;
  });
  arr2.forEach((item) => {
    //@ts-ignore
    const key = item[prop2].toString();
    const base = map1[key];
    if (!base) return;

    joined.push({
      ...base,
      ...item,
    });
  });
  console.timeEnd('join');
  return joined;
}
