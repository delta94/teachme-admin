import React, { ReactElement, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { useAppSkeleton } from '../../../../hooks/skeleton';

import { WMSkeletonInput } from '../../WMSkeleton';
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
  const appInit = useAppSkeleton();

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedOption(selected);
    message.info(`${label ?? 'The'} filter changed to ${selected.value}`);
  };

  return (
    <div className={classes['dropdown-filter']}>
      {appInit ? (
        <WMDropdown options={options} selected={selectedOption} onSelectedChange={handleMenuClick}>
          <WMButton>
            {label && <label>{label}:</label>}
            {selectedOption.label ?? selectedOption.value}
            <DownOutlined />
          </WMButton>
        </WMDropdown>
      ) : (
        <WMSkeletonInput style={{ width: 200 }} active size="default" />
      )}
    </div>
  );
}
