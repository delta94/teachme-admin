import React, { ReactElement, useState } from 'react';

import { pluralizer } from '../../../../utils';
import { useAppContext } from '../../../../providers/AppContext';
import { EnvironmentType } from '../../../../interfaces/app.interfaces';
import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import { IWMDropdownOption } from '../../WMDropdown';
import EnvironmentDropdown from '../DialogEnvironmentDropdown/EnvironmentDropdown';

import { ReactComponent as VIcon } from './v.svg';
import classes from './style.module.scss';

export interface IPublishToEnvironmentDialog extends IWMConfirmationDialogWrapper {
  coursesCount: number;
  isInProgess?: boolean;
}

export default function PublishToEnvironmentDialog({
  coursesCount,
  open,
  onCancel,
  onConfirm,
  isInProgess,
}: IPublishToEnvironmentDialog): ReactElement {
  const [{ parsedEnvironments }] = useAppContext();
  const [environment, setEnvironment] = useState<IWMDropdownOption>(
    parsedEnvironments.find((env) => env.id === EnvironmentType.Test) ?? parsedEnvironments[0],
  );

  return (
    <WMConfirmationDialog
      open={open}
      title={
        <div className={classes['publish-dialog-title']}>
          <div>Publish to </div>
          <EnvironmentDropdown
            environments={parsedEnvironments}
            initialSelectedEnvironment={environment}
            onChange={(selected) => setEnvironment(selected)}
            disabled={isInProgess}
          />
        </div>
      }
      confirmClass={classes['confirmation-button']}
      confirmLabel={`Publish to ${environment.value}`}
      onConfirm={() =>
        onConfirm({ envId: environment.id, envName: environment.label ?? environment.value })
      }
      onCancel={onCancel}
      loadingConfirmButton={isInProgess}
      disableDialog={isInProgess}
    >
      <p>You are about to publish the following courses. Please review before confirmation.</p>
      <ul className={classes['publish-dialog-ul']}>
        <li>
          <VIcon />
          {coursesCount} {pluralizer('course', coursesCount)}
        </li>
        <li>
          <VIcon />
          Global settings
        </li>
      </ul>
    </WMConfirmationDialog>
  );
}
