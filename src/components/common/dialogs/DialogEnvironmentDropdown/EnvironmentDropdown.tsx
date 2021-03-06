import React, { ReactElement, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';

import WMDropdown, { IWMDropdownOption } from '../../WMDropdown';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function EnvironmentDropdown({
  className,
  onChange,
  initialSelectedEnvironment,
  environments,
  disabled,
}: {
  className?: string;
  onChange: (selected: IWMDropdownOption) => void;
  initialSelectedEnvironment?: IWMDropdownOption;
  environments: IWMDropdownOption[];
  disabled?: boolean;
}): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    initialSelectedEnvironment ?? environments[0],
  );

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
      disabled={disabled}
    >
      <WMButton className={classes['environment-dropdown-button']} icon={<DownOutlined />}>
        {selectedEnvironment.label ?? selectedEnvironment.value}
      </WMButton>
    </WMDropdown>
  );
}
