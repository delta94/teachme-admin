import React, { ReactElement } from 'react';
import { ContentItem } from '@walkme/types';

import WMCollapse, { WMCollapsePanel } from '../../WMCollapse';
import Header from '../../Header';
import Icon, { IconType } from '../../Icon';
import { CourseItemsList, ICourseOutlineItem } from '../../lists';
import EditableTitle, { EditableTitleType } from '../../EditableTitle';

import classes from './style.module.scss';

export default function CourseOutlineLessonItem({
  item,
  onChange,
}: {
  item: ICourseOutlineItem;
  onChange: (item: ICourseOutlineItem) => void;
}): ReactElement {
  return (
    <WMCollapse className={classes['lesson']}>
      <WMCollapsePanel
        header={
          <Header className={classes['lesson-header']}>
            <Icon type={IconType.Lesson} />
            <EditableTitle
              type={EditableTitleType.Lesson}
              isNew={Boolean(item.isNew)}
              onBlur={(value: string) => {
                const { isNew, ...newItem } = item;

                onChange({ ...newItem, title: value });
              }}
              value={item.title}
            />
          </Header>
        }
        key={item.id}
      >
        {item.childNodes && <CourseItemsList items={item.childNodes as ContentItem[]} />}
      </WMCollapsePanel>
    </WMCollapse>
  );
}
