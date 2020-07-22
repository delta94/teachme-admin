import React, { ReactElement, useState, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { ContentItem } from '@walkme/types';

import { getFlatItemsList } from '../../../../walkme';

import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import DetailsPanel from '../../../common/DetailsPanel';

import WMCard from '../../../common/WMCard';
import Icon from '../../../common/Icon';
import CourseItemDetails from '../../../common/CourseItemDetails';

import classes from './playground.module.scss';

export default function CourseItemDetailsPanel(): ReactElement {
  const [items, setItems] = useState([] as ContentItem[]);
  const [selectedItem, setSelectedItem] = useState((null as unknown) as ContentItem);

  const handleItemClicked = (item: ContentItem): void => {
    setSelectedItem(item);
  };

  const getItems = async () => {
    const courseItems = await getFlatItemsList(0);
    setItems(courseItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className={classes['cards-wrapper']}>
      <WMCard className={cc([classes['buttons'], classes['grow']])}>
        {Boolean(items.length) &&
          items.map((item: ContentItem, index: number) => (
            <div key={`course-details-button-${index}`}>
              <WMButton
                variant={ButtonVariantEnum.Link}
                onClick={() => handleItemClicked(item)}
                icon={<Icon type={item.type} />}
              >
                {item.title}
              </WMButton>
              <Divider />
            </div>
          ))}
      </WMCard>
      <DetailsPanel
        title={selectedItem && selectedItem.title}
        titleIcon={selectedItem && <Icon type={selectedItem.type} />}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem((null as unknown) as ContentItem)}
        titleIsEllipsis
      >
        {selectedItem && <CourseItemDetails courseItem={selectedItem} />}
      </DetailsPanel>
    </div>
  );
}
