import React, { ReactElement, useEffect, useState } from 'react';
import cc from 'classcat';

import {
  useCourseEditorContext,
  fetchItemsList,
  ActionType,
} from '../../../providers/CourseEditorContext';

import WMCard from '../../common/WMCard';
import EditableTitle from '../../common/EditableTitle';
import ScreenHeader from '../../common/ScreenHeader';
import RefreshButton from '../../common/buttons/RefreshButton';
import SearchFilter from '../../common/filters/SearchFilter';
import Icon, { IconType } from '../../common/Icon';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';
import WMButton from '../../common/WMButton';

import classes from './style.module.scss';

const ItemIcon = {
  smartwalkthru: IconType.SmartWalkthruSmall,
  article: IconType.ArticleSmall,
  video: IconType.VideoSmall,
};

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

export default function CourseEditorScreen({ isNew = false }: { isNew?: boolean }): ReactElement {
  const [
    { courseItems, itemsSearchValue, filteredItems, isDetailsPanelOpen },
    dispatch,
  ] = useCourseEditorContext();
  const [courseTitle, setCourseTitle] = useState('Untitled Course');

  const onBlur = (text: string) => {
    setCourseTitle(text);
  };

  useEffect(() => {
    fetchItemsList(dispatch);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch]);

  const onSearch = (newSearchValue: string) => {
    if (!courseItems) return;

    const newCourseItems = courseItems.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(newSearchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetItemsSearchValue,
      itemsSearchValue: newSearchValue,
      items: newCourseItems,
    });
  };

  const onRefresh = async () => {
    await fetchItemsList(dispatch);
    onSearch(itemsSearchValue ?? '');
  };

  const cardTabs = [
    {
      id: TabId.CourseOutline,
      title: 'Course Outline',
      content: (
        <WMButton
          className={classes['add-btn']}
          icon={<Icon type={IconType.Plus} />}
          onClick={() => dispatch({ type: ActionType.ToggleDetailsPanel })}
        />
      ),
    },
    {
      id: TabId.Settings,
      title: 'Settings',
      content: null, // TODO: add content
    },
  ];

  return (
    <>
      <ScreenHeader
        title={<EditableTitle onBlur={onBlur} value={courseTitle} isNew={isNew} />}
        hideTimeFilter={true}
      />
      <div className={classes['cards-wrapper']}>
        <WMCard
          className={classes['items']}
          title={
            <div className={classes['title']}>
              <span>Items</span>
              <RefreshButton onRefresh={onRefresh} />
            </div>
          }
        >
          <div className={classes['filters-bar']}>
            <SearchFilter
              className={classes['search']}
              placeholder="Search"
              value={itemsSearchValue}
              onSearch={onSearch}
            />
          </div>
          <ul className={classes['item-list']}>
            {filteredItems &&
              filteredItems.map(({ title, type }, i) => (
                <li key={i} className={classes['item']}>
                  <span className={classes['item-icon']}>
                    {<Icon type={ItemIcon[type as keyof typeof ItemIcon]} />}
                  </span>
                  <span className={classes['item-title']}>{title}</span>
                </li>
              ))}
          </ul>
        </WMCard>
        <WMCard className={classes['course-structure']}>
          <WMTabs className={classes['tabs']} defaultActiveKey={TabId.CourseOutline}>
            {cardTabs.map(({ id, title, content }) => (
              <WMTabPanel tab={title} key={id}>
                {content}
              </WMTabPanel>
            ))}
          </WMTabs>
        </WMCard>
        <WMCard
          className={cc([classes['details-panel'], { [classes['open']]: isDetailsPanelOpen }])}
          title={<div className={classes['title']}>Some Details</div>}
        />
      </div>
    </>
  );
}