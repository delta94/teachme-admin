import React, { ReactElement, useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { useAppContext, setAppEnvironment } from '../../../providers/AppContext';

import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import { getParsedEnvironment } from './utils';

import classes from './style.module.scss';

export default function EnvironmentMenu({ className }: { className?: string }): ReactElement {
  const [{ environment, environments, parsedEnvironments }, dispatch] = useAppContext();

  const [selectedEnv, setSelectedEnv] = useState<IWMDropdownOption>();
  const [options, setOptions] = useState<IWMDropdownOption[]>(parsedEnvironments);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setAppEnvironment({
      dispatch,
      environments,
      envId: parseInt(selected.id as string),
    });
    setSelectedEnv(selected);

    message.info(`Environment changed to ${selected.value}`);
  };

  useEffect(() => {
    if (environment?.id) setSelectedEnv(getParsedEnvironment(environment));
  }, [environment, environment.id]);

  useEffect(() => {
    setOptions(parsedEnvironments);
  }, [parsedEnvironments, setOptions]);

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
