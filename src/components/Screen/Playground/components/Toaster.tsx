import React, { ReactElement } from 'react';

import { Divider } from 'antd';
import WMToaster from '../../../common/WMToaster';

export default function Toaster(): ReactElement {
  return (
    <>
      <WMToaster number={'1'} text={'course published to Production'} buttonName={'Publish'} />
      <Divider />
      <WMToaster text={'Export completed'} buttonName={'Export'} />
    </>
  );
}
