import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { useAppContext, setAppSystem } from '../../../providers/AppContext';
import { getSystems } from '../../../walkme';

import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import { parseSystems } from './utils';

import classes from './style.module.scss';

export default function SystemMenu({ className }: { className?: string }): ReactElement {
  const [systems, setSystems] = useState<SystemData[]>([]);
  const [options, setOptions] = useState<IWMDropdownOption[]>([]);

  const handleMenuClick = (selected: IWMDropdownOption) =>
    setAppSystem({
      dispatch,
      systems,
      systemId: parseInt(selected.id as string),
    });

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

  const [{ system }, dispatch] = useAppContext();
  const [selectedSystem, setSelectedSystem] = useState<IWMDropdownOption>();

  useEffect(() => {
    if (system?.userId) setSelectedSystem(parseSystems([system]) as IWMDropdownOption);
  }, [system]);

  const { pathname } = useLocation();
  const isEditorScreen = pathname.includes('course-editor');

  return (
    <WMDropdown
      className={className}
      options={options}
      selected={selectedSystem}
      onSelectedChange={handleMenuClick}
      disabled={isEditorScreen}
    >
      <WMButton className={classes['dropdown-menu-button']}>
        {selectedSystem
          ? selectedSystem.value
          : (Boolean(options.length) && options[0].value) ?? ''}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
