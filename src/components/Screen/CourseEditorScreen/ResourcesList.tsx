import React, { ReactElement } from 'react';
import cc from 'classcat';

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
import WMEmpty from '../../common/WMEmpty';

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

  const hasCourseItems = courseItems?.length === 0 ? false : true;
  const hasFilteredCourseItems = filteredCourseItems?.length === 0 ? false : true;

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
      <div
        className={cc([
          classes['items-container'],
          { [classes['empty-state-items']]: !hasFilteredCourseItems },
        ])}
      >
        {hasCourseItems || hasFilteredCourseItems ? (
          <CourseItemsList items={getCourseItems(filteredCourseItems)} />
        ) : hasCourseItems ? (
          <WMEmpty description="No results found" />
        ) : (
          <WMEmpty
            description={
              <>
                <div>There are no items available.</div>
                <div>Create Walk-thrus and resources from the WalkMe Editor.</div>
              </>
            }
          />
        )}
      </div>
    </WMCard>
  );
}
