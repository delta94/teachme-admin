import { ReactNode } from 'react';
import { RadioProps } from 'antd/lib/radio';

export interface IRadioButton {
  value: any;
  label: React.ReactNode;
}

export interface IWMRadio extends RadioProps {
  value: any;
  label: ReactNode;
  className?: string;
}

export interface IWMRadioGroup extends IWMRadio {
  options: Array<IRadioButton>;
}
