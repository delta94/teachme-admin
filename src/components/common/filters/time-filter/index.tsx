import React, { ReactElement, useState, useEffect } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, DatePicker } from 'antd';
import moment from 'moment';

import { ITimeFilterOptions, TimeOption } from '../filters.interface';

import classes from './style.module.scss';

const options: ITimeFilterOptions[] = [
  { id: TimeOption.Yesterday },
  { id: TimeOption.LastWeek },
  { id: TimeOption.LastMonth },
  { id: TimeOption.LastThreeMonth },
  { id: TimeOption.Last7Days },
  { id: TimeOption.Last30Days },
  { id: TimeOption.Last90Days },
  {
    id: TimeOption.Custom,
    dates: {
      start: undefined,
      end: undefined,
    },
  },
];

const { RangePicker } = DatePicker;

export default function TimeFilter({ className = '' }: { className?: string }): ReactElement {
  const [time, setTime] = useState(options[0]);

  const handleMenuClick = (e: any) => {
    setTime(options[e.key]);
    console.log('click', e);
  };

  function onChange(dates: any, dateStrings: any) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

  const menu = (
    <Menu onClick={handleMenuClick} className="wm-dropdown-menu time-filter">
      {options.map((option, index) => (
        <Menu.Item className={cc([{ 'selected-item': time.id === option.id }])} key={index}>
          {option.id}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={cc([classes['time-filter-container'], className])}>
      <span className="label">Time: </span>
      <RangePicker
        className={classes['wm-range-picker']}
        dropdownClassName="wm-range-picker-dropdown"
        bordered={false}
        ranges={{
          // TODO: add here the other options
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Week': [moment().startOf('week'), moment().endOf('week')],
        }}
        format="YYYY/MM/DD"
        renderExtraFooter={() => {
          return (
            <Button
              type="default"
              onClick={() => {
                console.log('apply');
              }}
            >
              Apply
            </Button>
          );
        }}
      />
    </div>
  );
}
