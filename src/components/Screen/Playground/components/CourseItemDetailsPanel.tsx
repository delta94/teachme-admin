import React, { ReactElement, useState, useEffect } from 'react';
import { Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { useAppContext } from '../../../../providers/AppContext';
import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../../providers/CourseEditorContext';
import CourseOutlineList from '../../../Screen/CourseEditorScreen/CourseOutlineList';

import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import DetailsPanel from '../../../common/DetailsPanel';

import WMCard from '../../../common/WMCard';
import Icon from '../../../common/Icon';
import CourseItemDetails from '../../CourseEditorScreen/CourseItemDetails';

import classes from './playground.module.scss';

export default function CourseItemDetailsPanel(): ReactElement {
  const [{ course }, dispatch] = useCourseEditorContext();
  const [{ environment }, appDispatch] = useAppContext();
  const [selectedItem, setSelectedItem] = useState<any>();
  const history = useHistory();

  const [courseId, setCourseId] = useState(0);

  useEffect(() => {
    fetchItemsList(dispatch, environment.id);
    fetchCourse(dispatch, courseId, environment.id, history);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId, environment.id, history]);

  return (
    <div className={classes['cards-wrapper']}>
      <WMCard className={cc([classes['buttons'], classes['grow']])}>
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1284870)}>
          courseId 1284870
        </WMButton>
        <Divider />
      </WMCard>
      {course && Boolean(course.items?.toArray().length) && (
        <div className={classes['outline-demo']}>
          <CourseOutlineList
            items={course?.items.toArray() ?? []}
            course={course}
            hasQuiz={!!course?.quiz}
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
        {selectedItem && <CourseItemDetails courseItem={selectedItem} />}
      </DetailsPanel>
    </div>
  );
}
