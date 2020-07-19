import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import Icon, { IconType } from '../../../common/Icon';
import Header from '../../../common/Header';
import { CourseItemsList } from '../../../common/lists';

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

  return (
    <>
      <Header title="CourseItemsList: use it in CourseEditorScreen for items list" />
      {/* <CourseItemsList items={data} /> */}
      <Divider />
      <Header title="CourseOutlineList: use it in CourseEditorScreen for course-outline section" />
      <Divider />
      <Header title="Example WM-List + border + header + footer" />
      {/* <CourseItemsList
        header={<div>List with Header</div>}
        footer={<div>List with Footer</div>}
        bordered
        items={data}
      /> */}
      <Divider />
    </>
  );
}
