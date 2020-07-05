import React, { ReactElement } from 'react';
import { message } from 'antd';

import WMButton from '../../WMButton';
import Icon, { IconType } from '../../Icon';

import classes from './style.module.scss';

export default function ExportButton(): ReactElement {
  return (
    <WMButton
      className={classes['export-button']}
      onClick={() => message.info('Exporting file')}
      type="link"
      icon={<Icon type={IconType.FileExport} />}
    />
  );
}
