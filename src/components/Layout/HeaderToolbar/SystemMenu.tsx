import React, { ReactElement, useState, useEffect } from 'react';
import { message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { useAppContext, setAppSystem } from '../../../providers/AppContext';
import { getSystems } from '../../../walkme';

import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import { parseSystems } from './utils';

import classes from './style.module.scss';

export default function SystemMenu({ className }: { className?: string }): ReactElement {
  const [{ system }, dispatch] = useAppContext();

  const [selectedSystem, setSelectedSystem] = useState(parseSystems([system]) as IWMDropdownOption);

  const [systems, setSystems] = useState<SystemData[]>([]);
  const [options, setOptions] = useState<IWMDropdownOption[]>([]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setAppSystem({
      dispatch,
      systems,
      systemId: parseInt(selected.id as string),
    });

    message.info(`System changed to ${selected.value}`);
  };

  const getSystemsOptions = async () => {
    const systemsOptions = await getSystems();
    const options = parseSystems(systemsOptions);

    setSystems(systemsOptions);
    setOptions(options as IWMDropdownOption[]);
  };

  useEffect(() => {
    getSystemsOptions();

    return () => {
      setSystems([]);
      setOptions([]);
    };
  }, []);

  useEffect(() => {
    setSelectedSystem(parseSystems([system]) as IWMDropdownOption);
  }, [system]);

  return (
    <WMDropdown
      className={className}
      options={options}
      selected={selectedSystem}
      onSelectedChange={handleMenuClick}
    >
      <WMButton className={classes['dropdown-menu-button']}>
        {selectedSystem.value}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
