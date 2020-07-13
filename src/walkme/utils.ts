import { BooleanStringOption, BooleanNumberOption } from '@walkme/types';

export const convertToStringBoolean = (val: boolean): BooleanStringOption =>
  val ? BooleanStringOption.TRUE : BooleanStringOption.FALSE;

export const convertToNumberBoolean = (val: boolean): BooleanNumberOption =>
  val ? BooleanNumberOption.TRUE : BooleanNumberOption.FALSE;
