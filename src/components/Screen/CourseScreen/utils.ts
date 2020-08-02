import { CourseItemType } from '../../../interfaces/course.interfaces';
import { CourseChild } from '../../../walkme/data/courseBuild/courseItems';
import { CourseLesson } from '../../../walkme/data/courseBuild/courseItems/lesson';

import { ICourseOutlineItem } from './courseScreen.interface';

export const parseCourseOutline = (items: CourseChild[]): ICourseOutlineItem[] =>
  items.map((item: CourseChild) => {
    const isLesson = item.type === CourseItemType.Lesson;

    const itemData = {
      key: item.id,
      title: item.title,
      type: item.type as CourseItemType,
      itemName: { value: item.title, icon: !isLesson ? (item.type as CourseItemType) : undefined },
      className: `wm-expanded-default-hide-handler ${
        isLesson ? 'wm-expandable-item only-first-cell' : ''
      }`,
      // usersCompletedItem: undefined, // TODO: update this property from the data
      // dropOff: undefined, // TODO: update this property from the data
    };

    if (!isLesson) {
      return itemData;
    } else {
      return {
        ...itemData,
        children: (item as CourseLesson).childNodes.toArray().map((node: any) => ({
          className: '',
          key: node.id,
          title: node.title,
          type: node.type,
          itemName: { value: node.title, icon: node.type },
        })),
      };
    }
  });
