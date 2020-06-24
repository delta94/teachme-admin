import React, { ReactElement } from 'react';
import { Card } from 'antd';

import './index.less';

export type PropTypes = { props?: any; children?: React.ReactNode };

export default function WMCard({ props, children }: PropTypes): ReactElement {
  return (
    <Card className={'wm-card'} {...props}>
      {children}
    </Card>
  );
}
