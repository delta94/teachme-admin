import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { useLocation } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { useAppContext, setAppSystem, ActionType } from '../../../providers/AppContext';
import { getSystems } from '../../../walkme';

import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import { parseSystems } from './utils';

import classes from './style.module.scss';

export default function SystemMenu({ className }: { className?: string }): ReactElement {
  const [{ system, parsedSystems, systems }, dispatch] = useAppContext();
  const [selectedSystem, setSelectedSystem] = useState<IWMDropdownOption>();
  const [options, setOptions] = useState<IWMDropdownOption[]>([]);
  const systemIsValid = system !== '' && (system as SystemData)?.userId;

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setAppSystem({
      dispatch,
      systems,
      systemId: parseInt(selected.id as string),
    });

    message.info(`System changed to ${selected.value}`);
  };

  useEffect(() => {
    if (systemIsValid) setSelectedSystem(parseSystems([system as SystemData]) as IWMDropdownOption);
  }, [system, systemIsValid]);

  useEffect(() => {
    setOptions(parsedSystems as IWMDropdownOption[]);
  }, [parsedSystems, setOptions]);
  // unmount only
  useEffect(
    () => () => {
      setOptions([]);
    },
    [],
  );

  const { pathname } = useLocation();
  const isEditorScreen = pathname.includes('course-editor');

  return options.length ? (
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
  ) : (
    <></>
  );
}
