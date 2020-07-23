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
  const map: any = {};
  arr2.forEach((item) => {
    //@ts-ignore
    const key = item[prop2].toString();
    map[key] = item;
  });
  arr1.forEach((item) => {
    //@ts-ignore
    const key = item[prop1].toString();
    const base = map[key];

    joined.push({
      ...item,
      ...(base || {}),
    });
  });
  console.timeEnd('join');
  return joined;
}

export function index<T>(arr: T[], prop: string): { [key: string]: T } {
  const ret: any = {};
  for (const val of arr) {
    //@ts-ignore
    const key = val[prop].toString();
    ret[key] = val;
  }

  return ret;
}
