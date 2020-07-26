import React, { ReactElement, useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import WMDropdown, { IWMDropdownOption } from '../../WMDropdown';
import WMButton from '../../WMButton';

import classes from './style.module.scss';
import { useAppContext } from '../../../../providers/AppContext';
import { WMSkeletonInput } from '../../WMSkeleton';

export default function DropdownFilter({
  label,
  options,
}: {
  label?: string;
  options: IWMDropdownOption[];
}): ReactElement {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);

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
        <WMSkeletonInput style={{ width: 150 }} active size="default" />
      )}
    </div>
  );
}
