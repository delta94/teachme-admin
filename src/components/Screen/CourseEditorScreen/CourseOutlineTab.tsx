import React, { ReactElement, useState, useEffect, Dispatch, useCallback, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

import { ActionType } from '../../../providers/CourseEditorContext';
import {
  ActiveDetailsItem,
  DetailsPanelSettingsType,
} from '../../../providers/CourseEditorContext/course-editor-context.interface';

import { CourseItemType } from '../../../interfaces/course.interfaces';

import WMSkeleton from '../../common/WMSkeleton';

import { Course } from '../../../walkme/data/courseBuild/course';
import { Quiz } from '../../../walkme/data/courseBuild/quiz';
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

export interface ICourseOutlineTabProps {
  isFetchingCourse: boolean;
  course: Course | null;
  quiz: Quiz | null;
  isUpdating: boolean;
  activeDetailsItem: ActiveDetailsItem | null;
  isDetailsPanelOpen: boolean;
  dispatch: Dispatch<any>;
}

export default function CourseOutlineTab({
  isFetchingCourse,
  course,
  quiz,
  isUpdating,
  activeDetailsItem,
  isDetailsPanelOpen,
  dispatch,
}: ICourseOutlineTabProps): ReactElement {
  const [newQuizAdded, setNewQuizAdded] = useState(false);
  const [newLessonId, setNewLessonId] = useState<number>();
  const [newResource, setNewResource] = useState<INewResource>();

  const onItemClick = useCallback(
    (item: any) => {
      dispatch({
        type: ActionType.OpenDetailsPanel,
        activeDetailsItem: { type: DetailsPanelSettingsType.Item, id: item.id, item },
      });
    },
    [dispatch],
  );

  const onActionSelected = useCallback(
    (selectedType: CourseItemType, id?: number) => {
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
    },
    [dispatch],
  );

  const courseItems = course?.items.toArray();
  const paragraph = useMemo(() => ({ rows: 15 }), []);
  const items = useMemo(() => courseItems ?? [], [courseItems]);

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
        course={course}
        quiz={quiz}
        dispatch={dispatch}
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
        paragraph={paragraph}
      >
        {!quiz && !course?.items.toArray().length && (
          <CourseOutlineListEmptyState
            containerClassName={classes['course-outline-empty-state']}
            onActionSelected={onActionSelected}
            course={course}
            quiz={quiz}
            dispatch={dispatch}
          />
        )}
        {course && (
          <CourseOutlineList
            items={items}
            course={course}
            hasQuiz={!!quiz}
            handleItemClick={onItemClick}
            newLessonId={newLessonId}
            activeDetailsItem={activeDetailsItem}
            dispatch={dispatch}
          />
        )}
        {quiz && (
          <CourseOutlineQuiz
            course={course}
            quiz={quiz}
            isNew={newQuizAdded}
            activeDetailsItem={activeDetailsItem}
            isDetailsPanelOpen={isDetailsPanelOpen}
            dispatch={dispatch}
          />
        )}
      </WMSkeleton>
    </div>
  );
}
