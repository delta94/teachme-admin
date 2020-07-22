import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';

import classes from './style.module.scss';

export interface IFormGroup {
  className?: string;
  children: ReactNode;
  title?: ReactNode;
  label?: ReactNode;
  labelHtmlFor?: string;
}

export default function FormGroup({
  className,
  children,
  title,
  label,
  labelHtmlFor,
}: IFormGroup): ReactElement {
  return (
    <div className={cc([classes['form-group'], className])}>
      {title && <span className={classes['form-group-title']}>{title}</span>}
      {label && <label htmlFor={labelHtmlFor}>{label}</label>}
      {children}
    </div>
  );
}
