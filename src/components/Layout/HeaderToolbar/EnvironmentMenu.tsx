import React, { ReactElement, useState, useEffect } from 'react';
import { WalkMeEnvironment } from '@walkme/editor-sdk';
import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { allPropertiesAreExist } from '../../../utils';
import { useAppContext, setAppEnvironment } from '../../../providers/AppContext';
import { getEnvironments } from '../../../walkme';

import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import { parseEnvironments } from './utils';

import classes from './style.module.scss';

export default function EnvironmentMenu({ className }: { className?: string }): ReactElement {
  const [{ environment }, dispatch] = useAppContext();

  const [selectedEnv, setSelectedEnv] = useState<IWMDropdownOption>();
  const [environments, setEnvironments] = useState<WalkMeEnvironment[]>([]);
  const [options, setOptions] = useState<IWMDropdownOption[]>([]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setAppEnvironment({
      dispatch,
      environments,
      envId: parseInt(selected.id as string),
    });

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

    return () => {
      setEnvironments([]);
      setOptions([]);
    };
  }, []);

  useEffect(() => {
    if (allPropertiesAreExist(environment))
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
        {selectedEnv ? selectedEnv.value : (Boolean(options.length) && options[0].value) ?? ''}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
