import React, { ReactElement, useState } from 'react';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';
import { CourseItemType } from '../../../interfaces/course.interfaces';
import { getRandomFractionNumber } from '../../../utils/';

import CourseOutlineQuiz from '../../common/lists/CourseOutlineQuiz';
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
  const { course, quiz, courseOutlineSearchValue } = state;

  const [mockState, setMockState] = useState(new Date());
  const forceRerender = () => setMockState(new Date());

  const onActionSelect = (selected: IWMDropdownOption) => {
    if (selected.value === CourseItemType.Lesson) {
      // Add new lesson
      const newLesson = course?.items.addNewItem();
      if (newLesson) {
        newLesson.id = getRandomFractionNumber();
      }
    } else {
      // Add new quiz
      dispatch({ type: ActionType.AddQuiz });
    }

    dispatch({ type: ActionType.UpdateCourseOutline });
    forceRerender();
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
          hasQuiz={!!quiz}
          forceRerender={forceRerender}
        />
      )}
      {quiz && (
        <CourseOutlineQuiz
          item={quiz}
          forceRerender={forceRerender}
          quizItemClicked={({ type, data }) => {
            console.log('quizItemClicked type ', type);
            console.log('quizItemClicked data ', data);
          }}
        />
      )}
    </>
  );
}
