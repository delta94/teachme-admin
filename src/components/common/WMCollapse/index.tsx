import React, { ReactNode, ReactElement, useState, useEffect } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import cc from 'classcat';

import { ReactComponent as DownArrowIcon } from './down-arrow.svg';
import classes from './style.module.scss';

interface IWMCollapse {
  children: ReactNode;
  className?: string;
  header: ReactNode;
  headerClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function WMCollapse({
  children,
  className,
  header,
  headerClassName,
  isOpen = true,
  ...otherProps
}: IWMCollapse): ReactElement {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen, setOpen]);

  return (
    <div className={cc([classes['wm-collapse'], className])}>
      <div className={cc([classes['collapse-header'], headerClassName])}>
        <div
          className={cc([classes['collapse-button'], { [classes['is-open']]: open }])}
          onClick={() => setOpen(!open)}
        >
          <DownArrowIcon />
        </div>
        {header}
      </div>
      <div className={classes['collapse-content']}>
        <SmoothCollapse expanded={open} {...otherProps}>
          {children}
        </SmoothCollapse>
      </div>
    </div>
  );
}

export type { IWMCollapse };
