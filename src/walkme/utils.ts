import { BooleanStringOption, BooleanNumberOption, BitBoolean } from '@walkme/types';
import { resolve } from 'dns';

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

const idop = (x: any) => x;

export function saveAsCsv(
  data: Array<any>,
  headers: Array<string>,
  filename: string,
  options?: {
    lables?: Array<string>;
    mappers: { [key: string]: (value: any) => any };
  },
): Promise<void> {
  const str = convertToCSV(data, headers, options?.mappers);
  const blob = new Blob([str], { type: 'application/csv' });
  return saveCsv(blob, filename);
}

function convertToCSV(
  data: Array<any>,
  headers: Array<string>,
  mappers: { [key: string]: (value: any) => any } = {},
) {
  const csvArray: Array<string> = [headers.join()];
  for (let item of data) {
    const itemCsv = headers
      .map((header) => (mappers[header] ?? idop)(item[header]))
      .map((item) => `"${item}"`)
      .join();
    csvArray.push(itemCsv);
  }
  return csvArray.join('\r\n');
}

function saveCsv(blob: Blob, filename: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const a = document.createElement('a');
    a.download = `${filename}.csv`;
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', () => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
      resolve();
    });
    a.click();
  });
}
