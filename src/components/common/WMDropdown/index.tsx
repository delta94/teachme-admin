import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';
import { Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

import classes from './style.module.scss';

export interface IWMDropdownOption {
  id: string | number;
  value: string | number;
  label?: ReactNode;
  skip?: boolean;
  onClick?: () => void;
}

export interface IWMDropdown extends Omit<DropDownProps, 'overlay'> {
  options: IWMDropdownOption[];
  selected?: IWMDropdownOption;
  className?: string;
  onSelectedChange?: (selected: IWMDropdownOption) => void;
  children: ReactNode;
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
    const selected = options.find((option) => option.id.toString() === e.key);
    selected && onSelectedChange && onSelectedChange(selected);
  };

  const menu = (
    <Menu onClick={onMenuClick} className={cc([classes['wm-dropdown-menu'], className])}>
      {options.map((option) =>
        option.skip ? (
          'null'
        ) : (
          <Menu.Item
            key={option.id}
            className={cc([
              classes['wm-dropdown-menu-item'],
              { [classes['selected-item']]: selected?.id === option.id },
            ])}
            onClick={option.onClick}
          >
            {option.label ?? option.value}
          </Menu.Item>
        ),
      )}
    </Menu>
  );

  return (
    <>
      {options.length && (
        <Dropdown overlay={menu} trigger={['click']} {...otherProps}>
          {children}
        </Dropdown>
      )}
    </>
  );
}
