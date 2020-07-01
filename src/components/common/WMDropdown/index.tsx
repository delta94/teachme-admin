import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

export interface IWMDropdownOption {
  id: string | number;
  text: string;
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
    const selected = options.find((option) => option.id === e.key);
    console.log('click', e);
    selected && onSelectedChange && onSelectedChange(selected);
  };

  const menu = (
    <Menu onClick={onMenuClick} className={cc(['wm-dropdown-menu', className])}>
      {options.map((option) => (
        <Menu.Item
          className={cc([{ 'selected-item': selected?.id === option.id }])}
          key={option.id}
        >
          {option.text}
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
