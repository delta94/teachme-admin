import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

import classes from './style.module.scss';

export interface IWMDropdownOption {
  id: string | number;
  text: string;
  onClick?: () => void;
}

export interface IWMDropdown extends Omit<DropDownProps, 'overlay'> {
  options: IWMDropdownOption[];
  selected?: IWMDropdownOption;
  className?: string;
  onSelectedChange?: (selected: IWMDropdownOption) => void;
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
    const selected = options.find((option) => option.id.toString() === e.key);
    selected && onSelectedChange && onSelectedChange(selected);
  };

  const menu = (
    <Menu onClick={onMenuClick} className={cc([classes['wm-dropdown-menu'], className])}>
      {options.map((option) => (
        <Menu.Item
          key={option.id}
          className={cc([
            classes['wm-dropdown-menu-item'],
            { [classes['selected-item']]: selected?.id === option.id },
          ])}
          onClick={option.onClick}
        >
          {option.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} {...otherProps}>
      {children}
    </Dropdown>
  );
}
