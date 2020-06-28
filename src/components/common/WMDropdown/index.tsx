import React, { ReactElement } from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

export default function WMDropdown({
  children,
  dropdownMenu,
  dropdownProps,
}: {
  children: React.ReactNode;
  dropdownMenu: ReactElement;
  dropdownProps?: DropDownProps;
}): ReactElement {
  return (
    <Dropdown overlay={dropdownMenu} {...dropdownProps}>
      {children}
    </Dropdown>
  );
}
