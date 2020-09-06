import React, { ReactElement } from 'react';
import { ContentItem, TypeName } from '@walkme/types';
import {
  useCourseEditorContext,
  fetchItemsList,
  ActionType,
} from '../../../providers/CourseEditorContext';
import { useAppContext } from '../../../providers/AppContext';

import WMCard from '../../common/WMCard';
import WMSkeleton from '../../common/WMSkeleton';
import { RefreshButton } from '../../common/buttons';
import { SearchFilter } from '../../common/filters';

import ResourceItemsList from './ResourceItemList';
import ResourcesListEmptyState from './ResourcesListEmptyState';

import classes from './style.module.scss';

export default function ResourcesList(): ReactElement {
  const [
    {
      isUpdating,
      environment: { id: envId },
    },
  ] = useAppContext();
  const [state, dispatch] = useCourseEditorContext();
  const { isFetchingItems, courseItems, filteredCourseItems, courseItemsSearchValue } = state;

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
    await fetchItemsList(dispatch, envId, { refresh: true });
    onSearch(courseItemsSearchValue);
  };

  return (
    <WMCard
      className={classes['resources-list']}
      title={
        <div className={classes['title-container']}>
          <span className={classes['title']}>Items</span>
          <RefreshButton onClick={onRefresh} loading={isFetchingItems} />
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
      <WMSkeleton
        className={classes['resources-list-skeleton']}
        loading={isUpdating || isFetchingItems}
        active
        title={false}
        paragraph={{ rows: 15 }}
      >
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
      </WMSkeleton>
    </WMCard>
  );
}
