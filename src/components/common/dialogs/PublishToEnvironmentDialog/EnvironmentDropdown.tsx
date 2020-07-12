import React, { ReactElement, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';

import WMDropdown, { IWMDropdownOption } from '../../WMDropdown';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function EnvironmentDropdown({
  className,
  onChange,
  intialSelectedEnvironment,
  environments,
}: {
  className?: string;
  onChange: (selected: IWMDropdownOption) => void;
  intialSelectedEnvironment: IWMDropdownOption;
  environments: IWMDropdownOption[];
}): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(intialSelectedEnvironment);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedEnvironment(selected);
    onChange(selected);
  };

  useEffect(() => {
    onChange(selectedEnvironment);
  }, [onChange, selectedEnvironment]);

  return (
    <WMDropdown
      className={className}
      options={environments}
      selected={selectedEnvironment}
      onSelectedChange={handleMenuClick}
    >
      <WMButton className={classes['environment-dropdown-button']} icon={<DownOutlined />}>
        {selectedEnvironment.label ?? selectedEnvironment.value}
      </WMButton>
    </WMDropdown>
  );
}
