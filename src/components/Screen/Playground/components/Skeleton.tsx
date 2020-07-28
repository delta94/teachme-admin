import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { WMSkeletonInput } from '../../../common/WMSkeleton';
import { WMSkeletonAvatar } from '../../../common/WMSkeleton';
import { WMSkeletonButton } from '../../../common/WMSkeleton';
import WMSkeleton from '../../../common/WMSkeleton';

export default function Skeleton(): ReactElement {
  return (
    <>
      Paragraph
      <WMSkeleton active paragraph={{ rows: 10 }} />
      <Divider />
      Input
      <WMSkeletonInput style={{ width: 400 }} active size="default" />
      <Divider />
      Avatar - circle
      <WMSkeletonAvatar active size="default" shape="circle" />
      Avatar - square
      <WMSkeletonAvatar active size="default" shape="square" />
      <Divider />
      Button - round
      <WMSkeletonButton active size="default" shape="round" />
      Button - small circle
      <WMSkeletonButton active size="small" shape="circle" />
    </>
  );
}
