import React, { ReactElement, useEffect, useState } from 'react';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import { getFlatItemsList } from '../../../walkme';

import WMCard from '../../common/WMCard';
import EditableTitle from '../../common/ EditableTitle';
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

export default function CourseEditorScreen(): ReactElement {
  const [courseTitle, setCourseTitle] = useState('Untitled Course');

  const onBlur = (text: string) => {
    setCourseTitle(text);
  };

  const [courseItems, setCourseItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);

  const fetchItemList = async () => {
    try {
      const items = await getFlatItemsList(0);
      setCourseItems(items);
      setFilteredItems(items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItemList();
  }, []);

  const [searchValue, setSearchValue] = useState('');

  const onSearch = (newSearchValue: string) => {
    const newCourseItems = courseItems.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(newSearchValue.toLowerCase()),
    );
    setSearchValue(newSearchValue);
    setFilteredItems(newCourseItems);
  };

  const onRefresh = async () => {
    await fetchItemList();
    onSearch(searchValue);
  };

  const [isOpen, setIsOpen] = useState(false);

  const cardTabs = [
    {
      id: TabId.CourseOutline,
      title: 'Course Outline',
      content: (
        <WMButton
          className={classes['add-btn']}
          icon={<Icon type={IconType.Plus} />}
          onClick={() => setIsOpen(!isOpen)}
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
      <EditableTitle onBlur={onBlur} value={courseTitle} />
      <ScreenHeader title="new-course" />
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
              value={searchValue}
              onSearch={onSearch}
            />
          </div>
          <ul className={classes['item-list']}>
            {filteredItems.map(({ title, type }, i) => (
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
          className={cc([classes['details-panel'], { [classes['open']]: isOpen }])}
          title={<div className={classes['title']}>Some Details</div>}
        />
      </div>
    </>
  );
}
