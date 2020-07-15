import { ReactNode } from 'react';
import { ContentItem } from '@walkme/types';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  items?: Array<ContentItem>;
  courseTitle?: string;
  itemsSearchValue?: string;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingItems: boolean;
  isFetchingItemsError: boolean;
  courseItems: Array<ContentItem>;
  filteredItems: Array<ContentItem>;
  courseTitle: string;
  itemsSearchValue: string;
  isDetailsPanelOpen: boolean;
}

export interface ICourseEditorProvider {
  children: ReactNode;
}
