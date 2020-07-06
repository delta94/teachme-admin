import React, { ReactElement } from 'react';
import { Switch } from 'antd';
import classes from './style.module.scss';

export interface IWMSwitch {
  label: string;
  infoText?: string;
}

export default function IWMSwitch({ label, infoText, ...otherProps }: IWMSwitch): ReactElement {
  const onChange = (checked: any) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className={classes['wm-switch']}>
      <span className={classes['wm-switch-wrap']}>
        <Switch
          size="small"
          className={classes['switch-btn']}
          defaultChecked
          onChange={onChange}
          {...otherProps}
        />
        <span className={classes['switch-label']}>{label}</span>
      </span>
      <p className={classes['switch-info']}>{infoText}</p>
    </div>
  );
}
