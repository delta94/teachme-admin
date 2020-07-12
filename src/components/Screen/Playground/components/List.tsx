import React, { ReactElement, ReactNode } from 'react';
import { Divider } from 'antd';

import Icon, { IconType } from '../../../common/Icon';
import { WMList, WMListItem, WMCollapsibleList } from '../../../common/WMList';
import Header from '../../../common/Header';
import { CollapsibleContentType } from '../../../common/WMList/WMCollapsibleList';

export default function ListPlayground(): ReactElement {
  const data = [
    {
      text: 'Racing car sprays burning fuel into crowd.',
      icon: <Icon type={IconType.Article} />,
    },
    {
      text: 'Japanese princess to wed commoner.',
      icon: <Icon type={IconType.Video} />,
    },
    {
      text: 'Australian walks 100km after outback crash.',
      icon: <Icon type={IconType.SmartWalkthru} />,
    },
    {
      text: 'Man charged over missing wedding girl.',
      icon: <Icon type={IconType.Article} />,
    },
    {
      text: 'Los Angeles battles huge wildfires.',
      icon: <Icon type={IconType.Video} />,
    },
  ];

  const parseToCollapsibleItems = (
    arr: { text: string; icon: ReactNode }[],
    isNested: boolean = false,
  ) =>
    arr.map((item, index) => {
      return {
        key: `collapsible-item-${index}`,
        header: {
          children: item.text,
          icon: item.icon,
        },
        children: isNested ? (
          <WMList
            dataSource={data}
            renderItem={(item) => <WMListItem icon={item.icon}>{item.text}</WMListItem>}
          />
        ) : (
          'content'
        ),
      };
    });

  return (
    <>
      <Header title="WM-List" />
      <WMList
        dataSource={data}
        renderItem={(item) => <WMListItem icon={item.icon}>{item.text}</WMListItem>}
      />
      <Divider />
      <Header title="WM-List + border + header + footer" />
      <WMList
        header={<div>List with Header</div>}
        footer={<div>List with Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <WMListItem icon={item.icon}>{item.text}</WMListItem>}
      />
      <Divider />
      <Header title="WM-List Collapsible" />
      <WMCollapsibleList items={parseToCollapsibleItems(data)} />
      <Divider />
      <Header title="WM-List Collapsible + header + footer" />
      <WMCollapsibleList
        contentType={CollapsibleContentType.WMList}
        header={<div>List Collapsible with Header</div>}
        footer={<div>List Collapsible with Footer</div>}
        items={parseToCollapsibleItems(data, true)}
      />
    </>
  );
}
