import React, { ReactElement } from 'react';

import { ContentItem, TypeName } from '@walkme/types';
import {
  useCourseEditorContext,
  fetchItemsList,
  ActionType,
} from '../../../providers/CourseEditorContext';

import WMCard from '../../common/WMCard';
import { RefreshButton } from '../../common/buttons';
import { SearchFilter } from '../../common/filters';

import ResourceItemsList from './ResourceItemList';
import ResourcesListEmptyState from './ResourcesListEmptyState';
import classes from './style.module.scss';

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
      {courseItems.length ? (
        <ResourceItemsList
          items={filteredCourseItems}
          className={classes['resource-item-list']}
          isDisabled={(item: ContentItem) =>
            state.course?.includes(item.type as TypeName, item.id as number)
          }
        />
      ) : (
        <ResourcesListEmptyState />
      )}
    </WMCard>
  );
}
