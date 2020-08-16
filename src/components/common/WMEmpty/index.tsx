import React, { ReactElement } from 'react';
import { Empty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';
import cc from 'classcat';

import DataEmptyState from './DataEmptyState';
import SearchEmptyState from './SearchEmptyState';

import classes from './style.module.scss';

export { DataEmptyState, SearchEmptyState };

export interface IWMEmpty extends EmptyProps {
  containerClassName?: string;
}

export default function WMEmpty({
  className,
  containerClassName,
  children,
  image = null,
  ...otherProps
}: IWMEmpty): ReactElement {
  return (
    <div className={cc([classes['wm-empty'], containerClassName])}>
      <Empty
        className={cc([
          classes['empty-container'],
          { [classes['horizontal']]: !children },
          className,
        ])}
        image={image}
        {...otherProps}
      >
        {children}
      </Empty>
    </div>
  );
}
