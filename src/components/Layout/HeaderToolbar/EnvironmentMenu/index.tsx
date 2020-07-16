import React, { ReactElement, useState, useEffect } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { getEnvironments } from '../../../../walkme';
import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

import classes from '../style.module.scss';
import { parseEnvironmentsToDropdownOptions } from '../headerToolbar.utils';
import { useAppContext } from '../../../../providers/AppContext';

export default function EnvironmentMenu({ className }: { className?: string }): ReactElement {
  const [appState, appDispatch] = useAppContext();
  const { environment } = appState;
  const [selectedEnv, setSelectedEnv] = useState(
    parseEnvironmentsToDropdownOptions([environment]) as IWMDropdownOption,
  );
  const [options, setOptions] = useState([] as IWMDropdownOption[]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedEnv(selected);
    message.info(`Environment changed to ${selected.value}`);
  };

  const getEnvironmentsOptions = async () => {
    const environments = await getEnvironments();
    const options = parseEnvironmentsToDropdownOptions(environments);

    setOptions(options as IWMDropdownOption[]);
  };

  useEffect(() => {
    getEnvironmentsOptions();
  }, []);

  useEffect(() => {
    setSelectedEnv(parseEnvironmentsToDropdownOptions([environment]) as IWMDropdownOption);
  }, [environment]);

  return Boolean(selectedEnv) && Boolean(options) ? (
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
  ) : (
    <></>
  );
}
