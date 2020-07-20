import { ReactNode } from 'react';
import { ContentItem } from '@walkme/types';

import { ICourseOutlineItem } from '../../components/common/lists';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  courseTitle?: string;
  courseItems?: Array<ContentItem>;
  courseItemsSearchValue?: string;
  courseOutline?: Array<ICourseOutlineItem>;
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
  courseOutline: Array<ICourseOutlineItem>;
  filteredCourseOutline: Array<ICourseOutlineItem>;
  courseOutlineSearchValue: string;
  isDetailsPanelOpen: boolean;
}

export interface ICourseEditorProvider {
  children: ReactNode;
}
