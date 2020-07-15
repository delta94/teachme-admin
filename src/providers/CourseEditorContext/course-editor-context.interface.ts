import { ReactNode } from 'react';
import { ContentItem } from '@walkme/types';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  courseTitle?: string;
  courseItems?: Array<ContentItem>;
  courseItemsSearchValue?: string;
  courseOutline?: Array<ContentItem>;
  courseOutlineSearchValue?: string;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  courseTitle: string;
  isFetchingItems: boolean;
  isFetchingItemsError: boolean;
  courseItems: Array<ContentItem>;
  filteredCourseItems: Array<ContentItem>;
  courseItemsSearchValue: string;
  courseOutline: Array<ContentItem>;
  filteredCourseOutline: Array<ContentItem>;
  courseOutlineSearchValue: string;
  isDetailsPanelOpen: boolean;
}

export interface ICourseEditorProvider {
  children: ReactNode;
}
