import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { Menu, DatePicker } from 'antd';
import moment from 'moment';

import { TimeOption } from '../filters.interface';

import classes from './style.module.scss';

const { RangePicker } = DatePicker;

export default function TimeFilter({ className = '' }: { className?: string }): ReactElement {
  const [time, setTime] = useState();

  const onChange = (dates: any, dateStrings: any) => {
    // set the selected dates after changes and call to SDK
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  };

  return (
    <div className={cc([classes['time-filter-container'], className])}>
      <span className="label">Time: </span>
      <RangePicker
        className={classes['wm-range-picker']}
        dropdownClassName="wm-range-picker-dropdown"
        bordered={false}
        ranges={{
          // TODO: add here the other options
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
        format="YYYY/MM/DD"
        // renderExtraFooter={() => {
        //   return (
        //     <Button
        //       type="default"
        //       onClick={() => {
        //         console.log('apply');
        //       }}
        //     >
        //       Apply
        //     </Button>
        //   );
        // }}
      />
    </div>
  );
}
