import { ReactNode } from 'react';
import { RadioProps } from 'antd/lib/radio';

export interface IRadioButton {
  value: any;
  label: ReactNode;
  disabled?: boolean;
}

export interface IWMRadio extends RadioProps {
  value: any;
  label: ReactNode;
  className?: string;
}

export interface IWMRadioGroup extends Omit<IWMRadio, 'label'> {
  options: Array<IRadioButton>;
}