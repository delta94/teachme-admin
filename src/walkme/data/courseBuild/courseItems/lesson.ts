import { Container } from '../itemsContainer';
import { CourseTask, getCourseItems } from './task';
import {
  NewCourseItemData,
  WalkMeDataCourseNewItem,
  TypeName,
  WalkMeDataNewLesson,
  BuildLesson,
  CourseTaskCompletionType,
  NewCourseLessonData,
  GroupType,
  TypeId,
} from '@walkme/types';
import { createLink } from '../../services/collection';
import { getGuid } from '../../services/guid';

export class CourseLesson implements BuildLesson {
  public childNodes: Container<CourseTask, NewCourseItemData, WalkMeDataCourseNewItem>;
  public id: number;
  public description: string;
  public title: string;
  public keywords: Array<string>;
  public properties = {};
  public type = TypeName.Lesson;
  constructor(private _lesson: WalkMeDataNewLesson) {
    this.id = _lesson.Id;
    this.description = _lesson.Description || '';
    this.title = _lesson.Name;
    this.keywords = [];
    this.properties = {
      completionType: _lesson?.Settings?.cmplType ?? CourseTaskCompletionType.Completed,
    };
    this.childNodes = getCourseItems(_lesson.LinkedDeployables);
  }

  toDataModel(): WalkMeDataNewLesson {
    return {
      ...this._lesson,
      Description: this.description,
      Name: this.title,
      LinkedDeployables: this.childNodes.toArray().map((item, index) => createLink(item, index)),
    };
  }
}

export function newDataModel(index: number, data?: NewCourseLessonData): WalkMeDataNewLesson {
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
