import React, { ReactElement, useState } from 'react';

import WMConfirmationDialog from '../../WMConfirmationDialog';

import EnvironmentDropdown from './EnvironmentDropdown';
import { ReactComponent as VIcon } from './v.svg';
import classes from './style.module.scss';

export interface IDialogPublishToEnvironment {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function PublishToEnvironmentDialog({
  open,
  onCancel,
  onConfirm,
}: IDialogPublishToEnvironment): ReactElement {
  const [environment, setEnvironment] = useState<string | undefined>(undefined);

  return (
    <>
      <WMConfirmationDialog
        open={open}
        title={
          <div className={classes['publish-dialog-title']}>
            <div>Publish to </div>
            <EnvironmentDropdown onChange={(selected) => setEnvironment(selected)} />
          </div>
        }
        confirmLabel={`Publish to ${environment}`}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        <p>You are about to publish the following courses. Please review before confirmation.</p>
        <ul className={classes['publish-dialog-ul']}>
          <li>
            <VIcon />1 course
          </li>
          <li>
            <VIcon />
            Global settings
          </li>
        </ul>
      </WMConfirmationDialog>
    </>
  );
}
