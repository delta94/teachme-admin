import React, { ReactElement } from 'react';
import { Spin } from 'antd';

import WMDialog from '../../WMDialog';

import loadingPublishing from './loadingPublishing.png';
import classes from './style.module.scss';

export default function LoadingPublishingDialog({
  open,
  onClose,
  environment,
}: {
  open: boolean;
  onClose: () => void;
  environment: string;
}): ReactElement {
  return (
    <>
      <WMDialog
        open={open}
        onClose={onClose}
        hideHeader
        keyboard={false}
        maskClosable={false}
        className={classes['loading-publishing-dialog']}
      >
        <h2>Publishing to {environment}</h2>
        <p>This will take a few moments</p>
        <Spin />
        <img alt="people waiting" src={loadingPublishing} />
      </WMDialog>
    </>
  );
}
