import React, { ReactElement, useState } from 'react';

import { pluralizer } from '../../../../utils';
import { useAppContext } from '../../../../providers/AppContext';
import { EnvironmentType } from '../../../../interfaces/app.interfaces';
import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import { IWMDropdownOption } from '../../WMDropdown';
import EnvironmentDropdown from '../DialogEnvironmentDropdown/EnvironmentDropdown';

import { ReactComponent as VIcon } from './v.svg';
import classes from './style.module.scss';

export interface IArchiveFromEnvironmentDialog extends IWMConfirmationDialogWrapper {
  coursesCount: number;
  isInProgess?: boolean;
}

export default function ArchiveFromEnvironmentDialog({
  coursesCount,
  open,
  onCancel,
  onConfirm,
  isInProgess,
}: IArchiveFromEnvironmentDialog): ReactElement {
  const [{ parsedEnvironments }] = useAppContext();
  const [environment, setEnvironment] = useState<IWMDropdownOption>(
    parsedEnvironments.find((env) => env.id === EnvironmentType.Test) ?? parsedEnvironments[0],
  );

  return (
    <WMConfirmationDialog
      open={open}
      title={
        <div className={classes['archive-dialog-title']}>
          <div>Archive from </div>
          <EnvironmentDropdown
            environments={parsedEnvironments}
            initialSelectedEnvironment={environment}
            onChange={(selected) => setEnvironment(selected)}
            disabled={isInProgess}
          />
        </div>
      }
      confirmClass={classes['confirmation-button']}
      confirmLabel={`Archive from ${environment?.value}`}
      onConfirm={() =>
        onConfirm({ envId: environment.id, envName: environment.label ?? environment.value })
      }
      onCancel={onCancel}
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
