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
