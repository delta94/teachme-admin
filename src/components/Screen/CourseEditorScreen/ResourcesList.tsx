import React, { ReactElement } from 'react';

import {
  useCourseEditorContext,
  fetchItemsList,
  ActionType,
  IState,
} from '../../../providers/CourseEditorContext';

import WMCard from '../../common/WMCard';
import RefreshButton from '../../common/buttons/RefreshButton';
import SearchFilter from '../../common/filters/SearchFilter';
import { CourseItemsList } from '../../common/lists';
import Icon, { IconType } from '../../common/Icon';

import classes from './style.module.scss';

const ItemIcon = {
  smartwalkthru: IconType.SmartWalkthruSmall,
  article: IconType.ArticleSmall,
  video: IconType.VideoSmall,
};

const getCourseItems = (items: IState['filteredCourseItems']) =>
  items.map(({ title, type }) => ({
    text: title,
    icon: <Icon type={ItemIcon[type as keyof typeof ItemIcon]} />,
  }));

export default function ResourcesList(): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const { courseItems, filteredCourseItems, courseItemsSearchValue } = state;

  const onSearch = (searchValue: string) => {
    const newCourseItems = courseItems.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(searchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetCourseItemsSearchValue,
      courseItemsSearchValue: searchValue,
      courseItems: newCourseItems,
    });
  };

  const onRefresh = async () => {
    await fetchItemsList(dispatch);
    onSearch(courseItemsSearchValue);
  };

  return (
    <WMCard
      className={classes['resources-list']}
      title={
        <div className={classes['title']}>
          <span>Items</span>
          <RefreshButton onClick={onRefresh} />
        </div>
      }
    >
      <div className={classes['filters-bar']}>
        <SearchFilter
          className={classes['search']}
          placeholder="Search"
          value={courseItemsSearchValue}
          onSearch={onSearch}
        />
      </div>
      <CourseItemsList items={getCourseItems(filteredCourseItems)} />
    </WMCard>
  );
}
