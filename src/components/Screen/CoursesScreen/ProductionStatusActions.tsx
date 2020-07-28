import React, { ReactElement, useState } from 'react';
import { message } from 'antd';

import WMButton, { ButtonVariantEnum } from '../../common/WMButton';
import { PublishToEnvironmentDialog } from '../../common/dialogs';

import classes from './style.module.scss';

export default function ProductionStatusActions(): ReactElement {
  const [showPublish, setShowPublish] = useState(false);

  return (
    <>
      <div className={classes['production-status-actions']}>
        <WMButton variant={ButtonVariantEnum.Link} onClick={() => setShowPublish(true)}>
          Publish
        </WMButton>
        <WMButton
          variant={ButtonVariantEnum.Link}
          onClick={() => message.info(`Production status was changed to archive`)}
        >
          Archive
        </WMButton>
        <WMButton
          variant={ButtonVariantEnum.Link}
          onClick={() => message.info(`Production status was changed to draft`)}
        >
          Mark as Draft
        </WMButton>
      </div>
      <PublishToEnvironmentDialog
        open={showPublish}
        onCancel={() => setShowPublish(false)}
        onConfirm={() => {
          setShowPublish(false);
          message.info(`Production status changed to Published`);
        }}
      />
    </>
  );
}
