import React, { ReactElement, useEffect, useState } from 'react';
import { message } from 'antd';
import { ContentItem } from '@walkme/types';

import { getFlatItemsList } from '../../../walkme';

import WMCard from '../../common/WMCard';
import ScreenHeader from '../../common/ScreenHeader';
import RefreshButton from '../../common/buttons/RefreshButton';
import SearchFilter from '../../common/filters/SearchFilter';

import classes from './style.module.scss';

export default function CourseEditorScreen(): ReactElement {
  const [courseItems, setCourseItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const items = await getFlatItemsList(0);
        setCourseItems(items);
        setFilteredItems(items);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const onSearch = (searchValue: string) => {
    const newCourseItems = courseItems.filter((item) => {
      const str = `${item.title} ${item.description}`;
      return str.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredItems(newCourseItems);
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
              <RefreshButton onRefresh={() => message.info('Refreshing...')} />
            </div>
          }
        >
          <div className={classes['filter-bar']}>
            <SearchFilter className={classes['search']} placeholder="Search" onSearch={onSearch} />
          </div>
          {filteredItems.map((item, i) => (
            <div key={i} className={classes['item']}>
              {item.title}
            </div>
          ))}
        </WMCard>
        <WMCard
          className={classes['course-outline']}
          title={<div className={classes['title']}>Course Outline</div>}
        />
      </div>
    </>
  );
}
