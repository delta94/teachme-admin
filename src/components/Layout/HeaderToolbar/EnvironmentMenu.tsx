import React, { ReactElement, useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';

import { useAppContext, ActionType } from '../../../providers/AppContext';
import { getEnvironments } from '../../../walkme';

import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import { parseEnvironments } from './headerToolbar.utils';

import classes from './style.module.scss';

export default function EnvironmentMenu({ className }: { className?: string }): ReactElement {
  const [appState, appDispatch] = useAppContext();
  const { environment } = appState;

  const [selectedEnv, setSelectedEnv] = useState(
    parseEnvironments([environment]) as IWMDropdownOption,
  );
  const [environments, setEnvironments] = useState([] as WalkMeEnvironment[]);
  const [options, setOptions] = useState([] as IWMDropdownOption[]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    const selectedItem = environments.find(({ id }) => selected.id === id);
    selectedEnv && appDispatch({ type: ActionType.SetEnvironment, environment: selectedItem });

    message.info(`Environment changed to ${selected.value}`);
  };

  const getEnvironmentsOptions = async () => {
    const environmentsOptions = await getEnvironments();
    const options = parseEnvironments(environmentsOptions);

    setEnvironments(environmentsOptions);
    setOptions(options as IWMDropdownOption[]);
  };

  useEffect(() => {
    getEnvironmentsOptions();
  }, []);

  useEffect(() => {
    setSelectedEnv(parseEnvironments([environment]) as IWMDropdownOption);
  }, [environment]);

  return (
    <WMDropdown
      className={className}
      options={options}
      selected={selectedEnv}
      onSelectedChange={handleMenuClick}
    >
      <WMButton className={classes['dropdown-menu-button']}>
        {selectedEnv.value}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
