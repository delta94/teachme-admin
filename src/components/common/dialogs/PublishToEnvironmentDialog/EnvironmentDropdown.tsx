import React, { ReactElement, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';

import WMDropdown, { IWMDropdownOption } from '../../WMDropdown';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

const environments: IWMDropdownOption[] = [
  { id: 0, text: 'Production' },
  { id: 1, text: 'Test' },
];

export default function EnvironmentDropdown({
  className,
  onChange,
}: {
  className?: string;
  onChange: (selected: string) => void;
}): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedEnvironment(selected);
    onChange(selected.text);
  };

  useEffect(() => {
    onChange(selectedEnvironment.text);
  }, []);

  return (
    <WMDropdown
      className={className}
      options={environments}
      selected={selectedEnvironment}
      onSelectedChange={handleMenuClick}
    >
      <WMButton className={classes['environment-dropdown-button']} icon={<DownOutlined />}>
        {selectedEnvironment.text}
      </WMButton>
    </WMDropdown>
  );
}
