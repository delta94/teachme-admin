import React, { ReactElement } from 'react';
import { Switch } from 'antd';
import classes from './style.module.scss';

type PropTypes = { descriptionText: string; infoText?: string };

export default function WMSwitch({ descriptionText, infoText }: PropTypes): ReactElement {
  const onChange = (checked: any) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className={classes['switch-container']}>
      <Switch size="small" className={classes['switch-btn']} defaultChecked onChange={onChange} />
      <span className={classes['switch-description']}>{descriptionText}</span>
      <div className={classes['switch-info']}>{infoText}</div>
    </div>
  );
}
