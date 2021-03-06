import { ReactNode } from 'react';

export interface ITableCell {
  className?: string;
}

export interface IDashCell extends ITableCell {
  value?: number | ReactNode;
  children: ReactNode;
  isRightAligned?: boolean;
}

export interface ILinkCell extends ITableCell {
  value: string;
  to: string;
}

export interface INumberCell extends ITableCell {
  value: number | string;
}

export interface IStatusDotCell extends ITableCell {
  value: string | number;
  passingValue?: number;
  passed?: boolean | null;
}

export interface ISubtextCell extends ITableCell {
  value: string;
  subtext: string;
}

export interface ITagCell extends ITableCell {
  value: string;
  color: string;
}

export interface ITextArrayCell extends ITableCell {
  value: Array<string>;
}

export interface ITextCell extends ITableCell {
  value: ReactNode;
  hasPopover?: boolean;
}

export interface IIconTextCell extends ITableCell {
  value: string;
  icon?: ReactNode;
}

export interface ICheckboxCell {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  hideSelectAllCheckbox?: boolean;
}
