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
import { Quiz } from '../../walkme/data/courseBuild/quiz';

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
  updateHasChange?: boolean;
  activeDetailsItem?: { type: DetailsPanelSettingsType; id: number; item: any } | null;
  openDetailsPanel?: boolean;
}

export interface IDispatch {
  (action: IAction): void;
}

export enum DetailsPanelSettingsType {
  Item = 'item',
  Quiz = 'quiz',
  Question = 'question',
  QuizWelcome = 'welcome',
  QuizFail = 'fail',
  QuizSuccess = 'success',
  Article = 'article',
  Video = 'video',
}

export interface ActiveDetailsItem {
  type: DetailsPanelSettingsType;
  id: number;
  item: any;
}

export interface IState {
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
  refreshCourseOutline: boolean;
  courseOutlineSearchValue: string;
  isDetailsPanelOpen: boolean;
  activeDetailsItem: ActiveDetailsItem | null;
  hasChanges: boolean;
  isSavingCourse: boolean;
}

export interface ICourseEditorProvider {
  children: ReactNode;
}
