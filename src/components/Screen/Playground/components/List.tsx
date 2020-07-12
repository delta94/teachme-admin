import React, { ReactElement } from 'react';

import WMList, { WMListItem } from '../../../common/WMList';
import Header from '../../../common/Header';
import { Divider } from 'antd';

export default function ListPlayground(): ReactElement {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <>
      <Header title="WMTable" />
      <WMList dataSource={data} renderItem={(item) => <WMListItem>{item}</WMListItem>} />
      <Divider />
      <Header title="WMTable + header + footer" />
      <WMList
        header={<div>List with Header</div>}
        footer={<div>List with Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <WMListItem>{item}</WMListItem>}
      />
      <Divider />
      <Header title="WMTable ..." />
    </>
  );
}
