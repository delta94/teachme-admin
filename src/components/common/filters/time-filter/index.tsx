import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';

import { ITimeFilterOptions, TimeOption } from '../filters.interface';

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

export default function TimeFilter({ className = '' }: { className?: string }): ReactElement {
  const [time, setTime] = useState(options[0]);

  const handleMenuClick = (e: any) => {
    setTime(options[e.key]);
    console.log('click', e);
  };

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
    <div className={`wm-time-filter ${className}`}>
      <span className="label">Time: </span>
      <Dropdown overlay={menu}>
        <Button type="link" className={`wm-btn filter-menu`}>
          {time.id}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
