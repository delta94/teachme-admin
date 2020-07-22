import React, { ReactElement, useState } from 'react';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';
import { CourseItemType } from '../../../interfaces/course.interfaces';
import { getRandomFractionNumber } from '../../../utils/';

import SearchFilter from '../../common/filters/SearchFilter';
import Icon, { IconType } from '../../common/Icon';
import WMButton from '../../common/WMButton';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import { CourseOutlineList } from '../../common/lists';

import classes from './style.module.scss';

export interface IProperties {
  isAvailable?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
  passmark?: number;
  resultsViewActive?: boolean;
  isCompleted?: boolean;
}

const options: IWMDropdownOption[] = [
  {
    id: 0,
    value: CourseItemType.Lesson,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.LessonSmall} />
        Add Lesson
      </div>
    ),
  },
  {
    id: 1,
    value: CourseItemType.Quiz,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.LessonSmall} />
        Add Quiz
      </div>
    ),
  },
];

export default function CourseOutlineTab(): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const { course, filteredCourseOutline, courseOutlineSearchValue } = state;

  const [mockState, setMockState] = useState(new Date());
  const forceRerender = () => setMockState(new Date());

  const onActionSelect = (selected: IWMDropdownOption) => {
    if (selected.value === CourseItemType.Lesson) {
      // Add new lesson
      const newLesson = course?.items.addNewItem();
      if (newLesson) {
        newLesson.id = getRandomFractionNumber();
      }
      forceRerender();
    } else {
      // Add new quiz
      // TODO: add new quiz
      console.log('quiz added');
    }

    dispatch({ type: ActionType.UpdateCourseOutline });
  };

  return (
    <>
      <WMDropdown options={options} onSelectedChange={onActionSelect}>
        <WMButton className={classes['add-btn']} icon={<Icon type={IconType.Plus} />} />
      </WMDropdown>
      <SearchFilter
        className={classes['search']}
        placeholder="Search"
        value={courseOutlineSearchValue}
        onSearch={() => {
          console.log('searching');
        }}
      />
      {course && (
        <CourseOutlineList
          items={course?.items.toArray() ?? []}
          course={course}
          forceRerender={forceRerender}
        />
      )}
    </>
  );
}
