import React, { ReactElement, useState } from 'react';

import { EnvironmentType } from '../../../../interfaces/app.interfaces';
import { pluralizer } from '../../../../utils';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import { IWMDropdownOption } from '../../WMDropdown';

import EnvironmentDropdown from './EnvironmentDropdown';
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

export default function ArchiveFromEnvironmentDialog({
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
        <div className={classes['archive-dialog-title']}>
          <div>Archive from </div>
          <EnvironmentDropdown
            environments={environments}
            intialSelectedEnvironment={environment}
            onChange={(selected) => setEnvironment(selected)}
            disabled={isInProgess}
          />
        </div>
      }
      confirmLabel={`Archive from ${environment.value}`}
      onCancel={onCancel}
      onConfirm={() => onConfirm(environment.id)}
      loadingConfirmButton={isInProgess}
      disableDialog={isInProgess}
    >
      <p>You are about to archive the following courses. Please review before confirmation.</p>
      <ul className={classes['archive-dialog-ul']}>
        <li>
          <VIcon />
          {coursesCount} {pluralizer('course', coursesCount)}
        </li>
      </ul>
    </WMConfirmationDialog>
  );
}
