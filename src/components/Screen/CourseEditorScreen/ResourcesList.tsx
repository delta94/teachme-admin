import React, { Dispatch, ReactElement, useCallback, useMemo } from 'react';
import { ContentItem, TypeName } from '@walkme/types';

import { fetchItemsList, ActionType } from '../../../providers/CourseEditorContext';
import { Course } from '../../../walkme/data/courseBuild/course';

import WMCard from '../../common/WMCard';
import WMSkeleton from '../../common/WMSkeleton';
import { RefreshButton } from '../../common/buttons';
import { SearchFilter } from '../../common/filters';

import ResourceItemsList from './ResourceItemList';
import ResourcesListEmptyState from './ResourcesListEmptyState';

import classes from './style.module.scss';

export interface IResourcesListProps {
  course: Course | null;
  isFetchingItems: boolean;
  courseItems: Array<ContentItem>;
  filteredCourseItems: Array<ContentItem>;
  courseItemsSearchValue: string;
  courseItemsLength: number | undefined;
  isUpdating: boolean;
  envId: number;
  dispatch: Dispatch<any>;
}

function ResourcesList({
  course,
  isFetchingItems,
  courseItems,
  filteredCourseItems,
  courseItemsLength, // this is used to render or prevent render using React.memo
  courseItemsSearchValue,
  isUpdating,
  envId,
  dispatch,
}: IResourcesListProps): ReactElement {
  const onSearch = useCallback(
    (searchValue: string) => {
      const newCourseItems = courseItems.filter(
        ({ title, description }: { title: string; description: string }) =>
          `${title} ${description}`.toLowerCase().includes(searchValue.toLowerCase()),
      );

      dispatch({
        type: ActionType.SetCourseItemsSearchValue,
        courseItemsSearchValue: searchValue,
        courseItems: newCourseItems,
      });
    },
    [courseItems, dispatch],
  );

  const onRefresh = useCallback(async () => {
    await fetchItemsList(dispatch, envId, { refresh: true });
    onSearch(courseItemsSearchValue);
  }, [courseItemsSearchValue, dispatch, envId, onSearch]);

  const isItemDisabled = useCallback(
    (item: ContentItem) => course?.includes(item.type as TypeName, item.id as number),
    [course?.includes],
  );

  const paragraph = useMemo(() => ({ rows: 15 }), []);

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
        paragraph={paragraph}
      >
        {courseItems.length ? (
          <ResourceItemsList
            items={filteredCourseItems}
            className={classes['resource-item-list']}
            isDisabled={isItemDisabled}
          />
        ) : (
          <ResourcesListEmptyState />
        )}
      </WMSkeleton>
    </WMCard>
  );
}

export default React.memo(ResourcesList);
