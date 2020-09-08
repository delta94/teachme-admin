import React, { ReactElement, useState, useEffect } from 'react';

import { Resource } from '../../../walkme/data/courseBuild/resource';
import { CourseLesson } from '../../../walkme/data/courseBuild/courseItems/lesson';
import { useAppContext } from '../../../providers/AppContext';
import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../providers/CourseEditorContext/course-editor-context.interface';

import { CourseItemType } from '../../../interfaces/course.interfaces';
import { CourseTask } from '../../../walkme/data/courseBuild/courseItems/task';

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
import { newResourcePanelType, isNewResource } from './utils';

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
  const [newResourceId, setNewResourceId] = useState<number>();

  const onItemClick = (item: CourseLesson | CourseTask) => {
    const type = !isNewResource(item as CourseTask)
      ? DetailsPanelSettingsType.Item
      : newResourcePanelType(item.type);

    dispatch({
      type: ActionType.OpenDetailsPanel,
      activeDetailsItem: { type, id: item.id, item: (item as CourseTask).linkedItem ?? item },
    });
  };

  const onActionSelected = ({
    selectedType,
    item,
  }: {
    selectedType: CourseItemType;
    item?: CourseLesson | CourseTask;
  }) => {
    if (selectedType === CourseItemType.Quiz) {
      setNewQuizAdded(true);

      // reset newQuizAdded
      setTimeout(() => setNewQuizAdded(false), 200);
    } else if (selectedType === CourseItemType.Lesson) {
      setNewLessonId(item?.id);

      // reset newLessonId
      setTimeout(() => setNewLessonId(undefined), 200);
    } else if (item) {
      dispatch({
        type: ActionType.OpenDetailsPanel,
        activeDetailsItem: {
          type: newResourcePanelType(item.type),
          id: item.id,
          item: (item as CourseTask).linkedItem,
        },
      });

      setNewResourceId(item?.id);

      // reset newResourceId
      setTimeout(() => setNewResourceId(undefined), 200);
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
            newResourceId={newResourceId}
          />
        )}
        {quiz && <CourseOutlineQuiz quiz={quiz} isNew={newQuizAdded} />}
      </WMSkeleton>
    </div>
  );
}
