import React, { ReactElement } from 'react';
import { ContentItem } from '@walkme/types';

import WMCollapse, { WMCollapsePanel } from '../../WMCollapse';
import Header from '../../Header';
import Icon, { IconType } from '../../Icon';
import { CourseItemsList } from '../../lists';

import classes from './style.module.scss';

export interface ICourseOutlineItem extends ContentItem {
  childNodes?: ContentItem[];
}

export default function CourseOutlineLessonItem({
  item,
}: {
  item: ICourseOutlineItem;
}): ReactElement {
  return (
    <WMCollapse className={classes['lesson']}>
      <WMCollapsePanel
        header={
          <Header className={classes['lesson-header']}>
            <Icon type={IconType.Lesson} />
            {item.title}
          </Header>
        }
        key={item.id}
      >
        {item.childNodes && (
          <CourseItemsList
            items={item.childNodes.map(({ title, type }) => ({
              text: title,
              icon: <Icon type={type} />,
            }))}
          />
        )}
      </WMCollapsePanel>
    </WMCollapse>
  );
}
