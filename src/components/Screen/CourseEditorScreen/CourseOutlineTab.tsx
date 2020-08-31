import React, { ReactElement, useState, useEffect } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../providers/CourseEditorContext/course-editor-context.interface';

import { CourseItemType } from '../../../interfaces/course.interfaces';

import WMSkeleton from '../../common/WMSkeleton';

import CourseOutlineQuiz from './CourseOutlineQuiz';
import CourseOutlineList from './CourseOutlineList';
import ActionMenu from './ActionMenu';
import CourseOutlineListEmptyState from './CourseOutlineListEmptyState';
import {
  INewResource,
  initialNewResourceBaseData,
  initialNewVideoData,
  NewResourceType,
} from './NewResourcePanel';

import classes from './style.module.scss';

export interface IProperties {
  isAvailable?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
  passmark?: number;
  resultsViewActive?: boolean;
  isCompleted?: boolean;
}

export default function CourseOutlineTab(): ReactElement {
  const [{ isUpdating }] = useAppContext();
  const [state, dispatch] = useCourseEditorContext();
  const { isFetchingCourse, course, quiz /* , courseOutlineSearchValue */ } = state;
  const [newQuizAdded, setNewQuizAdded] = useState(false);
  const [newLessonId, setNewLessonId] = useState<number>();
  const [newResource, setNewResource] = useState<INewResource>();

  const onItemClick = (item: any) => {
    dispatch({
      type: ActionType.OpenDetailsPanel,
      activeDetailsItem: { type: DetailsPanelSettingsType.Item, id: item.id, item },
    });
  };

  const onActionSelected = (selectedType: CourseItemType, id?: number) => {
    if (selectedType === CourseItemType.Quiz) {
      setNewQuizAdded(true);

      // reset newQuizAdded
      setTimeout(() => setNewQuizAdded(false), 200);
    } else if (selectedType === CourseItemType.Lesson) {
      id && setNewLessonId(id);

      // reset newLessonId
      setTimeout(() => setNewLessonId(undefined), 200);
    } else {
      const isBaseResource = selectedType === CourseItemType.Article;

      const panelType = isBaseResource
        ? DetailsPanelSettingsType.Article
        : DetailsPanelSettingsType.Video;

      if (id) {
        const newResourceData = {
          type: panelType,
          id,
          item: isBaseResource ? initialNewResourceBaseData : initialNewVideoData,
        };

        setNewResource({ ...newResourceData, type: selectedType as NewResourceType });

        // reset newLessonId
        setTimeout(() => setNewLessonId(undefined), 200);

        dispatch({
          type: ActionType.OpenDetailsPanel,
          activeDetailsItem: newResourceData,
        });
      }
    }
  };

  // unmount only
  useEffect(
    () => () => {
      setNewQuizAdded(false);
      setNewLessonId(undefined);
    },
    [],
  );

  return (
    <div className={classes['course-outline-tab']}>
      <ActionMenu
        className={classes['add-btn']}
        onActionSelected={onActionSelected}
        isLoading={isUpdating || isFetchingCourse}
      />
      {/* <SearchFilter
        className={classes['search']}
        placeholder="Search"
        value={courseOutlineSearchValue}
        onSearch={() => {
          console.log('searching');
        }}
      /> */}
      <WMSkeleton
        loading={isUpdating || isFetchingCourse}
        active
        title={false}
        paragraph={{ rows: 15 }}
      >
        {!quiz && !course?.items.toArray().length && (
          <CourseOutlineListEmptyState
            containerClassName={classes['course-outline-empty-state']}
            onActionSelected={onActionSelected}
          />
        )}
        {course && (
          <CourseOutlineList
            items={course?.items.toArray() ?? []}
            course={course}
            hasQuiz={!!quiz}
            handleItemClick={onItemClick}
            newLessonId={newLessonId}
            newResource={newResource}
          />
        )}
        {quiz && <CourseOutlineQuiz quiz={quiz} isNew={newQuizAdded} />}
      </WMSkeleton>
    </div>
  );
}
