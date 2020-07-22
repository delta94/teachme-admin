import { ReactNode } from 'react';
import { ContentItem } from '@walkme/types';
import { TypeContainer } from '@walkme/types/dist/general/apps';
import {
  CourseTaskBase,
  NewCourseItemData,
  NewCourseLessonData,
} from '@walkme/types/dist/general/apps/teachme/course';

import { ICourseOutlineItem } from '../../components/Screen/CourseEditorScreen/CourseOutlineList';
import { Course } from '../../walkme/data/courseBuild';

import { ActionType } from './actions';

export { ActionType };

export interface IAction {
  type: ActionType;
  courseTitle?: string;
  courseItems?: Array<ContentItem>;
  courseItemsSearchValue?: string;
  course?: Course | null;
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
  isFetchingCourse: boolean;
  isFetchingCourseError: boolean;
  course: Course | null;
  filteredCourseOutline:
    | TypeContainer<CourseTaskBase, NewCourseItemData | NewCourseLessonData>
    | [];
  refreshCourseOutline: boolean;
  courseOutlineSearchValue: string;
  isDetailsPanelOpen: boolean;
}

export interface ICourseEditorProvider {
  children: ReactNode;
}
