import React, { ReactElement, useState, useRef, useEffect, useCallback } from 'react';
import cc from 'classcat';
import { useDebounceCallback } from '@react-hook/debounce';

import WMPopover from '../WMPopover';

import { ITextCell } from './tableCells.interface';
import classes from './style.module.scss';

export default function TextCell({
  value,
  className,
  hasPopover = false,
  ...otherProps
}: ITextCell): ReactElement {
  const textCellRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(value);
  const [hasEllipsis, setHasEllipsis] = useState(false);

  const compareSize = useCallback(() => {
    if (textCellRef.current && textCellRef.current.scrollWidth > textCellRef.current.clientWidth) {
      setHasEllipsis(true);
      setContent(
        <WMPopover content={<span>{value}</span>}>
          <span>{value}</span>
        </WMPopover>,
      );
    } else {
      setHasEllipsis(false);
      setContent(value);
    }
  }, [value]);

  const debouncedCompareSize = useDebounceCallback(compareSize, 1000);

  // compare once and add resize listener on mount
  useEffect(() => {
    if (!hasPopover) return;

    compareSize();

    window.addEventListener('resize', debouncedCompareSize);
  }, [hasPopover, compareSize, debouncedCompareSize]);

  // remove resize listener on unmount
  useEffect(
    () => () => {
      window.removeEventListener('resize', debouncedCompareSize);
    },
    [debouncedCompareSize],
  );

  return (
    <div
      ref={textCellRef}
      className={cc([classes['text-cell'], className, { [classes['has-ellipsis']]: hasEllipsis }])}
      {...otherProps}
    >
      {content}
    </div>
  );
}
