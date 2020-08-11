import React, { ReactElement, useState } from 'react';

import { EnvironmentType } from '../../../../interfaces/app.interfaces';
import { pluralizer } from '../../../../utils';
import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import { IWMDropdownOption } from '../../WMDropdown';
import EnvironmentDropdown from '../DialogEnvironmentDropdown/EnvironmentDropdown';

import { ReactComponent as VIcon } from './v.svg';
import classes from './style.module.scss';

const environments: IWMDropdownOption[] = [
  { id: EnvironmentType.Production, value: 'Production' },
  { id: EnvironmentType.Test, value: 'Test' },
];

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
  const [environment, setEnvironment] = useState<IWMDropdownOption>(environments[0]);

  return (
    <WMConfirmationDialog
      open={open}
      title={
        <div className={classes['publish-dialog-title']}>
          <div>Publish to </div>
          <EnvironmentDropdown
            environments={environments}
            initialSelectedEnvironment={environment}
            onChange={(selected) => setEnvironment(selected)}
            disabled={isInProgess}
          />
        </div>
      }
      confirmLabel={`Publish to ${environment.value}`}
      onCancel={onCancel}
      onConfirm={() => onConfirm(environment.id)}
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
