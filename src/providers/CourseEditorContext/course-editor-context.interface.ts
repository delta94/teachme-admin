import { ReactNode } from 'react';
import { ContentItem, BuildCourse } from '@walkme/types';

import { TypeContainer } from '@walkme/types/dist/general/apps';
import {
  CourseTaskBase,
  NewCourseItemData,
  NewCourseLessonData,
} from '@walkme/types/dist/general/apps/teachme/course';
import { ICourseOutlineItem } from '../../components/common/lists';

import { ActionType } from './actions';
import { Course, Quiz } from '../../walkme/data/courseBuild';

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
  quiz: Quiz | null;
  filteredCourseOutline:
    | TypeContainer<CourseTaskBase, NewCourseItemData | NewCourseLessonData>
    | [];
  courseOutlineSearchValue: string;
  isDetailsPanelOpen: boolean;
}

export interface ICourseEditorProvider {
  children: ReactNode;
}
