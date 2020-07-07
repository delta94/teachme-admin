import React, { ReactElement } from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'react-router-dom';
import classes from './style.module.scss';

export interface IWMSwitch extends SwitchProps {
  label: string;
  infoText?: string;
  size: 'small' | 'default';
}

export default function IWMSwitch({
  label,
  infoText,
  size = 'small',
  ...otherProps
}: IWMSwitch): ReactElement {
  return (
    <div className={classes['wm-switch']}>
      <span className={classes['wm-switch-wrap']}>
        <Switch size={size} className={classes['switch-btn']} defaultChecked {...otherProps} />
        <span className={classes['switch-label']}>{label}</span>
      </span>
      <p className={classes['switch-info']}>{infoText}</p>
    </div>
  );
}
