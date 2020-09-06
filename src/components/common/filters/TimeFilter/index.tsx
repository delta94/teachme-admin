import React, { ReactElement, useCallback, useState } from 'react';
import cc from 'classcat';
import { DatePicker } from 'antd';
import moment from 'moment';

import useEventListener from '../../../../hooks/useEventListener';
import { getValidDateRange, IDateRange } from '../../../../utils';
import { WMSkeletonInput } from '../../WMSkeleton';
import { TimeOption } from '../filters.interface';

import classes from './style.module.scss';

const { RangePicker } = DatePicker;

export default function TimeFilter({
  className,
  dateRange,
  onDateRangeChange,
  isLoading,
  open,
  onOpenChange,
}: {
  className?: string;
  dateRange: IDateRange;
  onDateRangeChange: (dateRange: IDateRange | undefined) => void;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}): ReactElement {
  const { from, to } = dateRange;
  const dateFormat = 'YYYY-MM-DD';

  const [isOpen, setIsOpen] = useState(open ?? false);

  // This is used to add a class that hides the dropdown
  // since without it there is an animation that makes it feel slow and delayed
  const [closedByScroll, setClosedByScroll] = useState(open ?? false);

  const onChange = useCallback(
    (dates: any, dateStrings: string[]) => onDateRangeChange(getValidDateRange(dateStrings)),
    [onDateRangeChange],
  );

  const onOpenChangeCallback = useCallback(
    (openState) => {
      setIsOpen(openState);
      if (openState) setClosedByScroll(false);
      if (onOpenChange) onOpenChange(openState);
    },
    [onOpenChange],
  );

  const onScroll = useCallback((e: Event) => {
    setIsOpen(false);
    setClosedByScroll(true);
  }, []);

  useEventListener('scroll', onScroll, undefined, true);

  return (
    <div className={cc([classes['time-filter-container'], className])}>
      {isLoading ? (
        <WMSkeletonInput className={classes['time-filter']} active style={{ width: 400 }} />
      ) : (
        <>
          <span className="label">Time: </span>
          <RangePicker
            defaultValue={[moment(from, dateFormat), moment(to, dateFormat)]}
            className={classes['wm-range-picker']}
            dropdownClassName={cc([
              classes['wm-range-picker-dropdown'],
              { [classes['closed-by-scroll']]: closedByScroll },
            ])}
            bordered={false}
            ranges={{
              [TimeOption.Yesterday]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              [TimeOption.LastWeek]: [
                moment().subtract(1, 'weeks').startOf('week'),
                moment().subtract(1, 'weeks').endOf('week'),
              ],
              [TimeOption.LastMonth]: [
                moment().subtract(1, 'months').startOf('month'),
                moment().subtract(1, 'months').endOf('month'),
              ],
              [TimeOption.Last3Months]: [
                moment().subtract(3, 'months').startOf('month'),
                moment().subtract(1, 'months').endOf('month'),
              ],
              [TimeOption.Last7Days]: [
                moment().subtract(7, 'days').startOf('day'),
                moment().subtract(1, 'days').endOf('day'),
              ],
              [TimeOption.Last30Days]: [
                moment().subtract(30, 'days').startOf('day'),
                moment().subtract(1, 'days').endOf('day'),
              ],
              [TimeOption.Last90Days]: [
                moment().subtract(90, 'days').startOf('day'),
                moment().subtract(1, 'days').endOf('day'),
              ],
            }}
            onChange={onChange}
            format={dateFormat}
            open={isOpen}
            onOpenChange={onOpenChangeCallback}
          />
        </>
      )}
    </div>
  );
}
