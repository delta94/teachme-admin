import React, { ReactElement } from 'react';
import cc from 'classcat';
import { DatePicker } from 'antd';
import moment from 'moment';

import { ActionType } from '../../../../providers/CoursesContext/courses-context.interface';
import { useAppContext } from '../../../../providers/AppContext';
import { useCoursesContext } from '../../../../providers/CoursesContext';
import { getValidDateRange } from '../../../../utils';

import { WMSkeletonInput } from '../../WMSkeleton';

import { TimeOption } from '../filters.interface';

import classes from './style.module.scss';

const { RangePicker } = DatePicker;

export default function TimeFilter({ className }: { className?: string }): ReactElement {
  const [{ isUpdating }] = useAppContext();
  const [state, dispatch] = useCoursesContext();
  const {
    dateRange: { from, to },
  } = state;
  const dateFormat = 'YYYY-MM-DD';

  const onChange = (dates: any, dateStrings: string[]) =>
    dispatch({ type: ActionType.SetDateRange, dateRange: getValidDateRange(dateStrings) });

  if (isUpdating) {
    return <WMSkeletonInput active style={{ width: 400 }} />;
  }

  return (
    <div className={cc([classes['time-filter-container'], className])}>
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
          [TimeOption.LastThreeMonth]: [
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
    </div>
  );
}
