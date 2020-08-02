import React, { ReactElement } from 'react';
import cc from 'classcat';
import { DatePicker } from 'antd';
import moment from 'moment';

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
}: {
  className?: string;
  dateRange: IDateRange;
  onDateRangeChange: (dateRange: IDateRange | undefined) => void;
  isLoading?: boolean;
}): ReactElement {
  const { from, to } = dateRange;
  const dateFormat = 'YYYY-MM-DD';

  const onChange = (dates: any, dateStrings: string[]) =>
    onDateRangeChange(getValidDateRange(dateStrings));

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
            dropdownClassName={classes['wm-range-picker-dropdown']}
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
          />
        </>
      )}
    </div>
  );
}
