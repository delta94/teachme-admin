import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { Dropdown, message, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

export interface IWMDropdownOption {
  id: string | number;
  text: string;
}
export interface IWMDropdown extends Omit<DropDownProps, 'overlay'> {
  options: string[]; //IWMDropdownOption[];
  selected?: string;
  className?: string;
  onSelectedChange?: (e: any) => void;
  children: React.ReactNode;
}

export default function WMDropdown({
  children,
  className,
  selected,
  options,
  onSelectedChange,
  ...otherProps
}: IWMDropdown): ReactElement {
  const onMenuClick = (e: any) => {
    console.log('click', e);
    onSelectedChange && onSelectedChange(e);
  };

  const menu = (
    <Menu onClick={onMenuClick} className={cc(['wm-dropdown-menu', className])}>
      {options.map((option, index) => (
        <Menu.Item className={cc([{ 'selected-item': selected === option }])} key={index}>
          {option}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} {...otherProps}>
      {children}
    </Dropdown>
  );
}
