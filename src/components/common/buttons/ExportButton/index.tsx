import React, { ReactElement } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { message } from 'antd';

import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function ExportButton(): ReactElement {
  return (
    <WMButton
      className={classes['export-button']}
      onClick={() => message.info('Exporting file')}
      type="link"
      icon={<ExportOutlined />}
    />
  );
}
