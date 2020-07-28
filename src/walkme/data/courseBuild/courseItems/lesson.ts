import { Container, ITypeIdQueriable, DeployableContainer } from '../itemsContainer';
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
import defaults from '../defaults';

export class CourseLesson implements BuildLesson, ITypeIdQueriable {
  public childNodes: DeployableContainer<CourseTask, NewCourseItemData, WalkMeDataCourseNewItem>;
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

  includes(type: string, id: number) {
    return this.childNodes.includes(type, id);
  }
}

export function newDataModel(index: number, data?: NewCourseLessonData): WalkMeDataNewLesson {
  return {
    GroupType: GroupType.Lesson,
    Guid: null,
    Id: -index - 1,
    IsModified: true,
    LinkedDeployables: [],
    Name: defaults.NEW_LESSON_NAME,
    OrderIndex: index,
    PublishStatus: 0,
    ResourceId: getGuid(),
    Settings: {},
    deployableType: TypeId.Lesson,
    Description: '',
  };
}
