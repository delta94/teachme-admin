import React, { ReactElement, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import WMDropdown, { IWMDropdownOption } from '../../WMDropdown';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function DropdownFilter({
  label,
  options,
}: {
  label?: string;
  options: IWMDropdownOption[];
}): ReactElement {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedOption(selected);
    message.info(`${label ?? 'The'} filter changed to ${selected.value}`);
  };

  return (
    <div className={classes['dropdown-filter']}>
      <WMDropdown options={options} selected={selectedOption} onSelectedChange={handleMenuClick}>
        <WMButton>
          {label && <label>{label}:</label>}
          {selectedOption.label ?? selectedOption.value}
          <DownOutlined />
        </WMButton>
      </WMDropdown>
    </div>
  );
}
