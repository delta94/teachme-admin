import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Container } from 'react-smooth-dnd';
import useResizeAware from 'react-resize-aware';
import { ContentItem } from '@walkme/types';

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
  itemBuffer: number,
  containerRef?: HTMLDivElement | null,
) => {
  const lastItemIndex = itemAmount - 1;
  const scrollTop = containerRef?.scrollTop ?? 0;
  const containerHeight = containerRef?.getBoundingClientRect().height ?? 0;

  // before
  const firstVisibleElement = Math.floor(scrollTop / itemHeight);
  const firstVisibleElementWithBuffer = Math.max(0, firstVisibleElement - itemBuffer);
  const beforeFillerHeight = itemHeight * Math.max(0, firstVisibleElementWithBuffer - 1);

  // after
  const lastVisibleElement = Math.min(
    firstVisibleElement + Math.ceil(containerHeight / itemHeight),
    lastItemIndex,
  );
  const lastVisibleElementWithBuffer = Math.min(lastVisibleElement + itemBuffer, lastItemIndex);
  const afterFillerHeight = itemHeight * (itemAmount - lastVisibleElementWithBuffer - 1);

  return {
    firstRenderedElement: firstVisibleElementWithBuffer,
    lastRenderedElement: lastVisibleElementWithBuffer,
    beforeFillerHeight,
    afterFillerHeight,
  };
};

const getRangeArray = (from: number, to: number) => {
  const length = to - from + 1; // Adds 1 to make the range inclusive
  return Array.from({ length }, (v, k) => from + k);
};

const itemHeight = 35;
const itemBuffer = 16;

export default function ResourceItemsList({
  items,
  className,
  taskItemProps = {},
  isDisabled,
  ...otherProps
}: ICourseItemsList): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [virtualizationProps, setVirtualizationProps] = useState(
    getVirtualizationProps(items.length, itemHeight, itemBuffer, null),
  );
  const [resizeListener] = useResizeAware(() =>
    getVirtualizationProps(items.length, itemHeight, itemBuffer, containerRef.current),
  );

  const onContainerScroll = () => {
    if (containerRef.current) {
      setVirtualizationProps(
        getVirtualizationProps(items.length, itemHeight, itemBuffer, containerRef.current),
      );
    }
  };

  const getIsVisible = (index: number) =>
    index >= virtualizationProps.firstRenderedElement &&
    index <= virtualizationProps.lastRenderedElement;

  useEffect(() => {
    if (containerRef.current) {
      setVirtualizationProps(
        getVirtualizationProps(items.length, itemHeight, itemBuffer, containerRef.current),
      );
    }
  }, [containerRef.current, items.length]);

  return (
    <div className={className} ref={containerRef} onScroll={onContainerScroll}>
      {resizeListener}
      <div style={{ height: virtualizationProps.beforeFillerHeight }} />
      <Container
        {...otherProps}
        behaviour="copy"
        getChildPayload={(i) => {
          // getChildPayload uses an internal index that reflects the rendered element's index in the DOM
          // therefore we must map the index to the index in the items array using the indexes we know we rendered
          // so that we may access the correct item data
          const { firstRenderedElement, lastRenderedElement } = virtualizationProps;
          const indexMap = getRangeArray(firstRenderedElement, lastRenderedElement);

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
