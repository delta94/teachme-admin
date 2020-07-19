import React, { ReactElement } from 'react';

import { Divider } from 'antd';
import WMToaster from '../../../common/WMToaster';

export default function Toaster(): ReactElement {
  return (
    <>
      <WMToaster course={'1'} text={'course published to Production'} />
      <Divider />
      <WMToaster text={'Export completed'} />
    </>
  );
}
