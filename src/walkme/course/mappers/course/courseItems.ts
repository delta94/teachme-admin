import {
  WalkMeDataCourseItem,
  WalkMeDataEditedCourse,
  BuildCourseTask,
  WalkMeDataItem,
  ContentItem,
  TypeName,
  WalkMeDataCourseNewItem,
  WalkMeDataCourseTask,
  WalkMeLink,
  CourseTaskCompletionType,
  BuildCourseTaskProperties,
  WalkMeDataLesson,
  WalkMeDataNewLesson,
  CourseProperties,
  WalkMeDataCollection,
  Lesson,
  BuildLesson,
  WalkMeDataCollectionItem,
  NewCourseItemData,
  NewCourseLessonData,
  TypeId,
  WalkMeDataNewCourseTask,
  GroupType,
} from '@walkme/types';
import defaults from '../../defaults';
import { resolveLinks, createLink, resolveLinksSync } from '../../../collection';
import * as lessonMap from './lesson';
import * as itemMap from './item';
import { notEmpty, isTrue, convertToNumberBoolean } from '../../../utils';
import { Container } from '../../itemsContainer';
import { getDataSync } from '../../../data';
import { getTypeName, getTypeId } from '../../../item';
import { type } from 'os';
import { getGuid } from '../../../guid';

// export async function toUIModel(
//   items: Array<WalkMeDataCourseItem>,
// ): Promise<Array<BuildCourseTask>> {
//   const courseItems = await resolveLinks(items, 0, {
//     mapper: itemMapper,
//   });
//   return courseItems.filter(notEmpty);
// }

// function itemMapper(
//   item: ContentItem,
//   original: WalkMeDataItem,
//   link?: WalkMeLink,
// ): BuildCourseTask {
//   return item.type == TypeName.Lesson ? item : mapItem(item, original, link);
// }

// function mapItem(
//   item: BuildCourseTask,
//   original: WalkMeDataItem,
//   link?: WalkMeDataCourseTask,
// ): BuildCourseTask {
//   return {
//     ...item,
//     properties: {
//       completionType: link?.Settings.cmplType ?? CourseTaskCompletionType.Completed,
//     },
//   };
// }

// export function toDataModel(
//   items: Array<BuildCourseTask>,
//   dataLessons: Array<WalkMeDataNewLesson>,
// ): {
//   courseItems: Array<WalkMeDataCourseNewItem>;
//   lessons: Array<WalkMeDataNewLesson>;
// } {
//   const courseItems: Array<WalkMeDataCourseNewItem> = [];
//   const lessons: Array<WalkMeDataNewLesson> = [];
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];
//     if (item.type == TypeName.Lesson) {
//       const lesson =
//         item.id > 0
//           ? dataLessons.find((lesson) => lesson.Id == item.id)
//           : lessonMap.newDataModel(i);
//       if (!lesson) throw new Error("Can't map to non-existing  lesson");

//       lessons.push(lessonMap.toDataModel(item, lesson, i));
//     }
//     courseItems.push(itemMap.toDataModel(item, i));
//   }
//   return { courseItems, lessons };
// }

export type CourseChild = CourseLesson | CourseTask;
export type CourseChildData = WalkMeDataNewLesson | WalkMeDataNewCourseTask;
export type CourseChildNewItemData = NewCourseLessonData | NewCourseItemData;
export type CourseChildContainer = Container<CourseChild, CourseChildNewItemData, CourseChildData>;

export const getCourseChildren = (data: Array<CourseChildData>): CourseChildContainer =>
  new Container(data, getCourseChildItem, getNewCourseItem);

export const getCourseItems = (itemsData: Array<WalkMeDataNewCourseTask>) =>
  new Container(itemsData, (data) => new CourseTask(data), getNewItem);

function getCourseChildItem(data: CourseChildData): CourseChild {
  if (isLesson(data)) {
    return new CourseLesson(data as WalkMeDataNewLesson);
  }
  return new CourseTask(data);
}

function getNewCourseItem(index: number, newItemData: CourseChildNewItemData): CourseChildData {
  if (isLessonData(newItemData)) {
    return getNewLesson(index, newItemData as NewCourseLessonData);
  }
  return getNewItem(index, newItemData);
}

function isLessonData<TValue>(value: TValue): value is TValue {
  return (value as any).index != null;
}

function isLesson<TValue>(value: TValue): value is TValue {
  return (value as any).LinkedDeployables != null;
}

function getNewLesson(index: number, data: NewCourseLessonData): WalkMeDataNewLesson {
  return {
    GroupType: GroupType.Lesson,
    Guid: null,
    Id: -index - 1,
    IsModified: true,
    LinkedDeployables: [],
    Name: `Lesson ${index}`,
    OrderIndex: index,
    PublishStatus: 0,
    ResourceId: getGuid(),
    Settings: {},
    deployableType: TypeId.Lesson,
    Description: '',
  };
}
function getNewItem(index: number, data: NewCourseItemData): WalkMeDataNewCourseTask {
  return {
    DeployableID: data.id,
    DeployableType: getTypeId(data.type),
    OrderIndex: index,
    Settings: {
      cmplType: CourseTaskCompletionType.Completed,
    },
  };
}

export class CourseLesson implements BuildLesson {
  public childNodes: Container<CourseTask, NewCourseItemData, WalkMeDataCourseNewItem>;
  public id: number;
  public description: string;
  public title: string;
  public keywords: Array<string>;
  public properties = {};
  public type = TypeName.Lesson;
  constructor(private lesson: WalkMeDataNewLesson) {
    this.id = lesson.Id;
    this.description = lesson.Description || '';
    this.title = lesson.Name;
    this.keywords = [];
    this.properties = {
      completionType: lesson?.Settings?.cmplType ?? CourseTaskCompletionType.Completed,
    };
    this.childNodes = getCourseItems(lesson.LinkedDeployables);
  }

  toDataModel(): WalkMeDataNewLesson {
    return {
      ...this.lesson,
      Description: this.description,
      Name: this.title,
      LinkedDeployables: this.childNodes.toArray().map((item, index) => createLink(item, index)),
    };
  }
}
export class CourseTask implements BuildCourseTask {
  public description: string;
  public id: number;
  public keywords: Array<string>;
  public properties: BuildCourseTaskProperties;
  public title: string;
  public type: string;
  constructor(private data: WalkMeDataNewCourseTask) {
    const [item] = getDataSync(data.DeployableType, [data.DeployableID]);
    this.description = item.Description || '';
    this.id = (item?.Id as number) ?? -1;
    this.keywords = [];
    this.title = item.Name;
    this.type = getTypeName(item.deployableType);
    this.properties = {
      completionType: data?.Settings.cmplType ?? CourseTaskCompletionType.Completed,
    };
  }

  toDataModel(index: number): WalkMeDataNewCourseTask {
    return {
      ...this.data,
      Settings: {
        cmplType: this.properties.completionType,
      },
      OrderIndex: index,
    };
  }
}
