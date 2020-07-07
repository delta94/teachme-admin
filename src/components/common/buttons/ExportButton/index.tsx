import React, { ReactElement } from 'react';
import { message } from 'antd';
import cc from 'classcat';

import Icon, { IconType } from '../../Icon';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function ExportButton({ className }: { className?: string }): ReactElement {
  return (
    <WMButton
      className={cc([classes['export-button'], className])}
      onClick={() => message.info('Exporting file')}
      icon={<Icon type={IconType.FileExport} />}
    />
  );
}
