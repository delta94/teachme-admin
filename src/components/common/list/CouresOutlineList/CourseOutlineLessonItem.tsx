import React, { ReactElement } from 'react';
import { ContentItem } from '@walkme/types';

import WMCollapse from '../../WMCollapse';
import WMCollapsePanel from '../../WMCollapse/WMCollapsePanel';
import Header from '../../Header';
import Icon, { IconType } from '../../Icon';
import CourseItemsList from '../CourseItemsList';

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
    <WMCollapse className={classes.lesson}>
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
            items={item.childNodes.map((child) => {
              return { text: child.title, icon: <Icon type={child.type} /> };
            })}
          />
        )}
      </WMCollapsePanel>
    </WMCollapse>
  );
}
