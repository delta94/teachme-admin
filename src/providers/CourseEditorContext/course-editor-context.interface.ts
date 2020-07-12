import { ReactNode } from 'react';
import { ContentItem } from '@walkme/types';

export interface IAction {
  type:
    | 'FETCH_ITEMS'
    | 'FETCH_ITEMS_SUCCESS'
    | 'FETCH_ITEMS_ERROR'
    | 'SET_ITEMS_SEARCH_VALUE'
    | 'TOGGLE_DETAILS_PANEL'
    | 'RESET_COURSE_EDITOR';
  items?: Array<ContentItem>;
  itemsSearchValue?: string;
}

export interface IDispatch {
  (action: IAction): void;
}

export interface IState {
  isFetchingItems: boolean;
  isFetchingItemsError: boolean;
  courseItems?: Array<ContentItem>;
  filteredItems?: Array<ContentItem>;
  itemsSearchValue?: string;
  isDetailsPanelOpen?: boolean;
}

export interface ICourseEditorProvider {
  children: ReactNode;
}
