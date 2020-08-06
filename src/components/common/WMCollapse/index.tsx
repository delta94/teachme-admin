import React, { ReactNode, ReactElement, useState, useEffect, forwardRef, Ref } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import cc from 'classcat';

import DragHandle from '../DragHandle/DragHandle';

import { ReactComponent as DownArrowIcon } from './down-arrow.svg';
import classes from './style.module.scss';

interface IWMCollapse {
  children: ReactNode;
  className?: string;
  header: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  isOpen?: boolean;
  hasDragHandle?: boolean;
  onClick?: (e: any) => void;
  onOpenChange?: (isOpen: boolean) => void;
  [key: string]: any;
}

const WMCollapse = forwardRef(
  (
    {
      children,
      className,
      header,
      headerClassName,
      contentClassName,
      isOpen = true,
      hasDragHandle = false,
      onClick,
      ...otherProps
    }: IWMCollapse,
    ref?: Ref<HTMLDivElement>,
  ): ReactElement => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
      setOpen(isOpen);
    }, [isOpen, setOpen]);

    return (
      <div ref={ref} className={cc([classes['wm-collapse'], className])}>
        <div
          className={cc([
            classes['collapse-header'],
            { [classes['has-drag-handle']]: hasDragHandle },
            headerClassName,
          ])}
          onClick={onClick}
        >
          {hasDragHandle && <DragHandle className={classes['collapse-drag-handle']} />}
          <div
            className={cc([classes['collapse-button'], { [classes['is-open']]: open }])}
            onClick={() => setOpen(!open)}
          >
            <DownArrowIcon />
          </div>
          {header}
        </div>
        <div className={classes['collapse-content']}>
          <SmoothCollapse expanded={open} className={contentClassName} {...otherProps}>
            {children}
          </SmoothCollapse>
        </div>
      </div>
    );
  },
);

export type { IWMCollapse };

export default WMCollapse;

WMCollapse.displayName = 'WMCollapse';
