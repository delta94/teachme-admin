import React, { ReactElement, useState, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { ContentItem } from '@walkme/types';

import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  fetchNewCourse,
  ActionType,
} from '../../../../providers/CourseEditorContext';
import { CourseOutlineList } from '../../../common/lists';

import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import DetailsPanel from '../../../common/DetailsPanel';

import WMCard from '../../../common/WMCard';
import Icon from '../../../common/Icon';
import CourseItemDetails from '../../../common/CourseItemDetails';

import classes from './playground.module.scss';

export default function CourseItemDetailsPanel(): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const [selectedItem, setSelectedItem] = useState<any>();
  const { course } = state;
  const [mockState, setMockState] = useState(new Date());
  const forceRerender = () => setMockState(new Date());
  const [courseId, setCourseId] = useState(0);

  const handleItemChanged = (updatedItem: ContentItem) => {
    setSelectedItem(updatedItem);
  };

  useEffect(() => {
    fetchItemsList(dispatch);

    if (courseId) {
      fetchCourse(dispatch, courseId);
    } else {
      fetchNewCourse(dispatch);
    }

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId]);

  return (
    <div className={classes['cards-wrapper']}>
      <WMCard className={cc([classes['buttons'], classes['grow']])}>
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1284870)}>
          Quiz Settings - courseId 1284870
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1297234)}>
          Quiz Settings - courseId 1297234
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1277328)}>
          Quiz Settings - courseId 1277328
        </WMButton>
        <Divider />
      </WMCard>
      {course && Boolean(course.items?.toArray().length) && (
        <div className={classes['outline-demo']}>
          <CourseOutlineList
            items={course?.items.toArray() ?? []}
            course={course}
            forceRerender={forceRerender}
            handleItemClick={(item) => {
              setSelectedItem(item);
            }}
          />
        </div>
      )}
      <DetailsPanel
        title={selectedItem && selectedItem.title}
        titleIcon={selectedItem && <Icon type={selectedItem.type} />}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem((null as unknown) as ContentItem)}
        titleIsEllipsis
      >
        {selectedItem && (
          <CourseItemDetails courseItem={selectedItem} courseItemChanged={handleItemChanged} />
        )}
      </DetailsPanel>
    </div>
  );
}
