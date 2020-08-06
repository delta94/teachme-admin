import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { useAppContext, setAppSystem, ActionType } from '../../../providers/AppContext';
import { getSystems } from '../../../walkme';

import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import { parseSystems } from './utils';

import classes from './style.module.scss';

export default function SystemMenu({ className }: { className?: string }): ReactElement {
  const [{ system }, dispatch] = useAppContext();
  const [selectedSystem, setSelectedSystem] = useState<IWMDropdownOption>();
  const [systems, setSystems] = useState<SystemData[]>([]);
  const [options, setOptions] = useState<IWMDropdownOption[]>([]);
  const [initiated, setInitiated] = useState(false);
  const systemIsValid = system !== '' && (system as SystemData)?.userId;

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setAppSystem({
      dispatch,
      systems,
      systemId: parseInt(selected.id as string),
    });

    message.info(`System changed to ${selected.value}`);
  };

  const getSystemsOptions = useCallback(async () => {
    if (systemIsValid) {
      dispatch({ type: ActionType.Updating });

      try {
        const systemsOptions = await getSystems();
        const options = parseSystems(systemsOptions);

        setSystems(systemsOptions);
        setOptions(options as IWMDropdownOption[]);
        dispatch({ type: ActionType.UpdateSuccess });
      } catch (error) {
        console.error(error);
        dispatch({ type: ActionType.UpdateError, errorMessage: error });
      }
    }
  }, [systemIsValid, dispatch]);

  useEffect(() => {
    if (!initiated) {
      getSystemsOptions();
      setInitiated(true);
    }
  }, [getSystemsOptions, initiated]);

  useEffect(() => {
    if (systemIsValid) setSelectedSystem(parseSystems([system as SystemData]) as IWMDropdownOption);
  }, [system, systemIsValid]);

  // unmount only
  useEffect(
    () => () => {
      setSystems([]);
      setOptions([]);
      setInitiated(false);
    },
    [],
  );

  return (
    <WMDropdown
      className={className}
      options={options}
      selected={selectedSystem}
      onSelectedChange={handleMenuClick}
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
