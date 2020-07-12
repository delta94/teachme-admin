import React, { ReactElement, ReactNode } from 'react';

import { WMList, WMListItem, WMCollapsibleList } from '../../../common/WMList';
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

  const parseToCollapsibleItems = (arr: string[]) =>
    arr.map((item, index) => {
      return {
        key: `collapsible-item-${index}`,
        header: <span>header {item}</span>,
        children: <span>content {item}</span>,
      };
    });

  return (
    <>
      <Header title="WM-List" />
      <WMList dataSource={data} renderItem={(item) => <WMListItem>{item}</WMListItem>} />
      <Divider />
      <Header title="WM-List + border + header + footer" />
      <WMList
        header={<div>List with Header</div>}
        footer={<div>List with Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <WMListItem>{item}</WMListItem>}
      />
      <Divider />
      <Header title="WM-List Collapsible" />
      <WMCollapsibleList items={parseToCollapsibleItems(data)} />
      <Divider />
      <Header title="WM-List Collapsible + header + footer" />
      <WMCollapsibleList
        header={<div>List Collapsible with Header</div>}
        footer={<div>List Collapsible with Footer</div>}
        items={parseToCollapsibleItems(data)}
      />
    </>
  );
}
