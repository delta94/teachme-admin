import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, message } from 'antd';

import { ITimeOptions, Time } from './filters.interface';

const options: ITimeOptions[] = [
  { id: Time.Yesterday },
  { id: Time.LastWeek },
  { id: Time.LastMonth },
  { id: Time.LastThreeMonth },
  { id: Time.Last7Days },
  { id: Time.Last30Days },
  { id: Time.Last90Days },
  {
    id: Time.Custom,
    dates: {
      start: undefined,
      end: undefined,
    },
  },
];

export default function TimeFilter(): ReactElement {
  const [time, setTime] = useState(options[0]);

  const handleMenuClick = (e: any) => {
    setTime(options[e.key]);
    console.log('click', e);
    message.info(`System changed to ${e.item.node.innerHTML}`);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="teachme-header-toolbar-menu time-filter">
      {options.map((option, index) => (
        <Menu.Item className={cc([{ 'selected-item': time.id === option.id }])} key={index}>
          {option.id}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button type="link" className="system-menu">
        {time.id}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
