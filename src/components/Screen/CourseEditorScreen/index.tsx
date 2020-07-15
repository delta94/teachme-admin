import React, { ReactElement, useEffect } from 'react';
import cc from 'classcat';

import {
  useCourseEditorContext,
  fetchItemsList,
  ActionType,
  IState,
} from '../../../providers/CourseEditorContext';

import WMCard from '../../common/WMCard';
import EditableTitle from '../../common/EditableTitle';
import ScreenHeader from '../../common/ScreenHeader';
import RefreshButton from '../../common/buttons/RefreshButton';
import SearchFilter from '../../common/filters/SearchFilter';
import { CourseItemsList } from '../../common/lists';
import Icon, { IconType } from '../../common/Icon';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';
import WMButton from '../../common/WMButton';

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

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

export default function CourseEditorScreen({ isNew = false }: { isNew?: boolean }): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const {
    courseTitle,
    courseItems,
    filteredCourseItems,
    courseItemsSearchValue,
    courseOutline,
    filteredCourseOutline,
    courseOutlineSearchValue,
    isDetailsPanelOpen,
  } = state;

  useEffect(() => {
    fetchItemsList(dispatch);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch]);

  const onBlur = (courseTitle: string) =>
    dispatch({ type: ActionType.SetCourseTitle, courseTitle });

  const onCourseItemsSearch = (newSearchValue: string) => {
    const newCourseItems = courseItems.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(newSearchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetCourseItemsSearchValue,
      courseItemsSearchValue: newSearchValue,
      courseItems: newCourseItems,
    });
  };

  const onCourseItemsRefresh = async () => {
    await fetchItemsList(dispatch);
    onCourseItemsSearch(courseItemsSearchValue ?? '');
  };

  const onCourseOutlineSearch = (newSearchValue: string) => {
    const newCourseOutline = courseOutline.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(newSearchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetCourseOutlineSearchValue,
      courseOutlineSearchValue: newSearchValue,
      courseOutline: newCourseOutline,
    });
  };

  console.log(filteredCourseOutline);

  const cardTabs = [
    {
      id: TabId.CourseOutline,
      title: 'Course Outline',
      content: (
        <>
          <WMButton
            className={classes['add-btn']}
            icon={<Icon type={IconType.Plus} />}
            onClick={() => dispatch({ type: ActionType.ToggleDetailsPanel })}
          />
          <SearchFilter
            className={classes['search']}
            placeholder="Search"
            value={courseOutlineSearchValue}
            onSearch={onCourseOutlineSearch}
          />
          {filteredCourseOutline.length ? 'some items' : <div>nothing here yet</div>}
        </>
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
              <RefreshButton onClick={onCourseItemsRefresh} />
            </div>
          }
        >
          <div className={classes['filters-bar']}>
            <SearchFilter
              className={classes['search']}
              placeholder="Search"
              value={courseItemsSearchValue}
              onSearch={onCourseItemsSearch}
            />
          </div>
          <CourseItemsList items={getCourseItems(filteredCourseItems)} />
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
