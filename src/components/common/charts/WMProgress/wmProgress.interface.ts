import { ProgressProps } from 'antd/lib/progress';

export enum ProgressType {
  Line = 'line',
  Circle = 'circle',
  Dashboard = 'dashboard',
}

export enum ProgressStatus {
  Success = 'success',
  Exception = 'exception',
  Normal = 'normal',
  Active = 'active', // line only
}

export interface IWMProgress extends Omit<ProgressProps, 'type' | 'status'> {
  className?: string;
  type?: ProgressType;
  status?: ProgressStatus;
}
