import React, { ReactElement } from 'react';
import cc from 'classcat';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';
import { CourseItemType } from '../../../interfaces/course.interfaces';
import { getRandomString } from '../../../utils';

import SearchFilter from '../../common/filters/SearchFilter';
import Icon, { IconType } from '../../common/Icon';
import WMButton from '../../common/WMButton';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import { CourseOutlineList, ICourseOutlineItem } from '../../common/lists';
import WMEmpty from '../../common/WMEmpty';
import AddButton from '../../common/buttons/AddButton';

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
  const { course, courseOutline, filteredCourseOutline, courseOutlineSearchValue } = state;

  const onSearch = (searchValue: string) => {
    const isMatch = (item: any) =>
      `${item.title} ${item.description}`.toLowerCase().includes(searchValue.toLowerCase());

    const getFilteredLessonChildren = (items: any[]) =>
      items.filter((child: any) => isMatch(child));

    // TODO: support filtering quiz
    const newCourseOutline = courseOutline
      .map((item: any) => {
        if (item.type === CourseItemType.Lesson) {
          const someChildrenAreMatch = item.childNodes.some((child: any) => isMatch(child));
          const filteredLesson = {
            ...item,
            childNodes: getFilteredLessonChildren(item.childNodes),
          };

          if (isMatch(item) || someChildrenAreMatch) {
            return filteredLesson;
          }
        } else {
          return isMatch(item) && item;
        }
      })
      .filter((item: any) => Boolean(item));

    dispatch({
      type: ActionType.SetCourseOutlineSearchValue,
      courseOutlineSearchValue: searchValue,
      courseOutline: newCourseOutline,
    });
  };

  const onActionSelect = (selected: IWMDropdownOption) => {
    const newCourseOutline = [...courseOutline];

    if (selected.value === CourseItemType.Lesson) {
      // Add new lesson
      newCourseOutline.push({
        id: `temp-${getRandomString()}`,
        type: CourseItemType.Lesson,
        title: 'New Lesson',
        description: '',
        properties: {} as IProperties,
        childNodes: [],
        isNew: true,
      });
    } else {
      // Add new quiz
      // TODO: add new quiz
      console.log('quiz added');
    }

    dispatch({ type: ActionType.UpdateCourseOutline, courseOutline: newCourseOutline });
  };

  const onItemChange = (item: ICourseOutlineItem) => {
    const newCourseOutline = courseOutline.map((coi) => {
      if (item.id === coi.id) return item;

      return coi;
    });

    dispatch({ type: ActionType.UpdateCourseOutline, courseOutline: newCourseOutline });
    onSearch(courseOutlineSearchValue);
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
        onSearch={onSearch}
      />
      {filteredCourseOutline.length ? (
        <CourseOutlineList items={filteredCourseOutline} onItemChange={onItemChange} />
      ) : (
        <WMEmpty
          description="Start building your course by creating lessons and draging items from the Items List"
          image={<Icon type={IconType.CourseEmpty} />}
        >
          <AddButton />
        </WMEmpty>
      )}
    </>
  );
}
