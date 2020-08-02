import { TypeName } from '@walkme/types';

import { CourseItemType } from '../../../interfaces/course.interfaces';
import {
  CourseOutlineUIModel,
  CourseOutlineUIModelItem,
  CourseOutlineUIModelLesson,
  CourseChildType,
} from '../../../walkme/models/course/outline';

import {
  ICourseOutlineItem,
  ICourseOutlineLesson,
  ICourseOutlineItems,
} from './courseScreen.interface';

const getItemType = (type: TypeName) => {
  switch (type) {
    case TypeName.Article:
      return CourseItemType.Article;
    case TypeName.Video:
      return CourseItemType.Video;
    case TypeName.SmartWalkThru:
      return CourseItemType.SmartWalkThru;
    default:
      throw new Error(`Unknown TypeName ${type}`);
  }
};

const parseDefaultItemData = (item: CourseOutlineUIModelItem | CourseOutlineUIModelLesson) => ({
  key: item.id,
  title: item.title,
});

const parseTaskData = (item: CourseOutlineUIModelItem, isNestedItem?: boolean) => ({
  type: getItemType(item.type) as CourseItemType,
  itemName: { value: item.title, icon: getItemType(item.type) as CourseItemType },
  className: !isNestedItem ? 'wm-expanded-default-hide-handler' : '',
  usersCompletedItem: item.users_completed,
  dropOff: item.drop_off,
});

const parseLessonData = (item: CourseOutlineUIModelLesson) => ({
  type: CourseItemType.Lesson,
  itemName: { value: item.title },
  className: 'wm-expanded-default-hide-handler wm-expandable-item only-first-cell',
  children: item.items.map((node: CourseOutlineUIModelItem) => ({
    key: node.id,
    title: node.title,
    ...parseTaskData(node, true),
  })),
});

export const parseCourseOutline = (items: CourseOutlineUIModel): ICourseOutlineItems =>
  items.map((item: CourseOutlineUIModelItem | CourseOutlineUIModelLesson) => {
    const itemDefault = parseDefaultItemData(item);

    if (item.childType !== CourseChildType.Lesson) {
      return {
        ...itemDefault,
        ...parseTaskData(item),
      } as ICourseOutlineItem;
    } else {
      return {
        ...itemDefault,
        ...parseLessonData(item),
      } as ICourseOutlineLesson;
    }
  });
