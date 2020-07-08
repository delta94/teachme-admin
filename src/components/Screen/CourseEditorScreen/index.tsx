import React, { ReactElement, useEffect, useState } from 'react';
import { ContentItem } from '@walkme/types';

import { getFlatItemsList } from '../../../walkme';

import WMCard from '../../common/WMCard';
import ScreenHeader from '../../common/ScreenHeader';
import RefreshButton from '../../common/buttons/RefreshButton';
import SearchFilter from '../../common/filters/SearchFilter';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';

import classes from './style.module.scss';

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

const cardTabs = [
  {
    id: TabId.CourseOutline,
    title: 'Course Outline',
    content: null, // TODO: add content
  },
  {
    id: TabId.Settings,
    title: 'Settings',
    content: null, // TODO: add content
  },
];

export default function CourseEditorScreen(): ReactElement {
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

  console.log(courseItems);

  return (
    <>
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
            {filteredItems.map((item, i) => (
              <li key={i} className={classes['item']}>
                {item.title}
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
      </div>
    </>
  );
}
