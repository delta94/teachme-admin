import React, { ReactElement } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../providers/CourseEditorContext/course-editor-context.interface';

import WMSkeleton from '../../common/WMSkeleton';

import CourseOutlineQuiz from './CourseOutlineQuiz';
import CourseOutlineList from './CourseOutlineList';
import ActionMenu from './ActionMenu';
import CourseOutlineListEmptyState from './CourseOutlineListEmptyState';
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

  const onItemClick = (item: any) => {
    dispatch({
      type: ActionType.OpenDetailsPanel,
      activeDetailsItem: { type: DetailsPanelSettingsType.Item, id: item.id, item },
    });
  };

  return (
    <div className={classes['course-outline-tab']}>
      <ActionMenu className={classes['add-btn']} />
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
          <CourseOutlineListEmptyState containerClassName={classes['course-outline-empty-state']} />
        )}
        {course && (
          <CourseOutlineList
            items={course?.items.toArray() ?? []}
            course={course}
            hasQuiz={!!quiz}
            handleItemClick={onItemClick}
          />
        )}
        {quiz && <CourseOutlineQuiz item={quiz} />}
      </WMSkeleton>
    </div>
  );
}
