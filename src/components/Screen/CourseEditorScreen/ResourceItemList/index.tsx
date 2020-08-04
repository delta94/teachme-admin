import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Container } from 'react-smooth-dnd';
import { ContentItem } from '@walkme/types';
import cc from 'classcat';

import TaskItem from '../TaskItem';

import classes from './style.module.scss';

export interface ICourseItemsList {
  items: Array<ContentItem>;
  className?: string;
  taskItemProps?: any;
  [key: string]: any;
}

const getVirtualizationProps = (
  itemAmount: number,
  itemHeight: number,
  containerRef?: HTMLDivElement | null,
) => {
  const scrollTop = containerRef?.scrollTop ?? 0;
  const containerHeight = containerRef?.getBoundingClientRect().height ?? 0;

  const firstVisibleElement = Math.floor(scrollTop / itemHeight);
  const lastVisibleElement = firstVisibleElement + Math.ceil(containerHeight / itemHeight);
  const beforeFillerHeight = itemHeight * Math.max(0, firstVisibleElement - 1);
  const afterFillerHeight = itemHeight * (itemAmount - lastVisibleElement);

  return {
    firstVisibleElement,
    lastVisibleElement,
    beforeFillerHeight,
    afterFillerHeight,
  };
};

const getRangeArray = (from: number, to: number) => {
  const length = to - from + 1; // Adds 1 to make the range inclusive
  return Array.from({ length }, (v, k) => from + k);
};

export default function ResourceItemsList({
  items,
  className,
  taskItemProps = {},
  isDisabled,
  ...otherProps
}: ICourseItemsList): ReactElement {
  const itemHeight = 35;
  const containerRef = useRef<HTMLDivElement>(null);
  const [virtualizationProps, setVirtualizationProps] = useState(
    getVirtualizationProps(items.length, itemHeight),
  );

  const onContainerScroll = () => {
    setVirtualizationProps(getVirtualizationProps(items.length, itemHeight, containerRef.current));
  };

  const getIsVisible = (index: number) =>
    index >= virtualizationProps.firstVisibleElement &&
    index <= virtualizationProps.lastVisibleElement;

  useEffect(() => {
    if (containerRef.current) {
      setVirtualizationProps(
        getVirtualizationProps(items.length, itemHeight, containerRef.current),
      );
    }
  }, [containerRef.current, items.length]);

  return (
    <div
      className={cc([classes['resource-items-list'], className])}
      ref={containerRef}
      onScroll={onContainerScroll}
    >
      <div style={{ height: virtualizationProps.beforeFillerHeight }} />
      <Container
        {...otherProps}
        behaviour="copy"
        getChildPayload={(i) => {
          // getChildPayload uses an internal index that reflects the rendered element's index in the DOM
          // therefore we must map the index to the index in the items array using the indexes we know we rendered
          // so that we may access the correct item data
          const { firstVisibleElement, lastVisibleElement } = virtualizationProps;
          const indexMap = getRangeArray(firstVisibleElement, lastVisibleElement);

          return items[indexMap[i]];
        }}
        dragClass={classes['card-ghost']}
      >
        {items.map((item, i) => {
          const disabled = isDisabled && isDisabled(item);
          const isVisible = getIsVisible(i);

          return isVisible ? (
            <TaskItem
              data-index={i}
              key={i}
              index={i}
              item={item}
              {...taskItemProps}
              disabled={disabled}
            />
          ) : null;
        })}
      </Container>
      <div style={{ height: virtualizationProps.afterFillerHeight }} />
    </div>
  );
}
