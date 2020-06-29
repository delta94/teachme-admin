import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';

import WMDropdown from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

const environments = ['All Courses', 'Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

export default function CoursesFilter(): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (e: any) => {
    setSelectedEnvironment(environments[e.key]);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="wm-dropdown-menu environment-menu">
      {environments.map((env, index) => (
        <Menu.Item className={cc([{ 'selected-item': selectedEnvironment === env }])} key={index}>
          {env}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <label>Course Name: </label>
      <WMDropdown dropdownMenu={menu}>
        <WMButton type="link">
          {selectedEnvironment}
          <DownOutlined />
        </WMButton>
      </WMDropdown>
    </>
  );
}
