import React, { ReactElement } from 'react';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';

import SearchFilter from '../../common/filters/SearchFilter';
import Icon, { IconType } from '../../common/Icon';
import WMButton from '../../common/WMButton';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';

import classes from './style.module.scss';

const ItemIcon = {
  smartwalkthru: IconType.SmartWalkthruSmall,
  article: IconType.ArticleSmall,
  video: IconType.VideoSmall,
};

const options: IWMDropdownOption[] = [
  {
    id: 0,
    value: 'new-lesson',
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.LessonSmall} />
        Add Lesson
      </div>
    ),
  },
  {
    id: 1,
    value: 'new-quiz',
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
  const { courseOutline, filteredCourseOutline, courseOutlineSearchValue } = state;

  const onSearch = (newSearchValue: string) => {
    const newCourseOutline = courseOutline.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(newSearchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetCourseOutlineSearchValue,
      courseOutlineSearchValue: newSearchValue,
      courseOutline: newCourseOutline,
    });
  };

  const onActionSelect = (selected: IWMDropdownOption) => {
    if (selected.value === 'new-lesson') {
      console.log('lesson added');
    } else {
      console.log('quiz added');
    }
  };

  console.log(filteredCourseOutline);

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
      {filteredCourseOutline.length ? 'some items' : <div>nothing here yet</div>}
    </>
  );
}
