import {
  BuildCourse,
  TypeName,
  WalkMeDataLesson,
  WalkMeDataNewCourse,
  WalkMeDataNewLesson,
  GroupType,
  TypeId,
  WalkMeDataCourseNewItem,
} from '@walkme/types';
import walkme from '@walkme/editor-sdk';
import * as itemsData from '../courseItems/index';
import { getGuid } from '../../services/guid';
import { Quiz } from '../quiz';
import { CourseChildContainer, isLesson } from '../courseItems/index';
import { CourseProperties } from '../settings';
import { createLink } from '../../services/collection';
import * as wmData from '../../services/wmData';
import { newDataModel } from './dataModel';
import { ITypeIdQueriable } from '../itemsContainer';

export type CourseOptions = {
  light: boolean;
};

export class Course implements BuildCourse, ITypeIdQueriable {
  public index!: number;
  public id!: number;
  public title!: string;
  public items!: CourseChildContainer;
  public get quiz(): Quiz | undefined {
    return this.properties.hasQuiz ? this._quiz : undefined;
  }
  public properties!: CourseProperties;
  private _quiz!: Quiz;
  constructor(private _course?: WalkMeDataNewCourse, options?: CourseOptions) {
    if (!this._course) {
      this._course = newDataModel(0);
    }
    this.map(this._course, options);
  }

  private map(course: WalkMeDataNewCourse, options?: CourseOptions): void {
    this._course = course;
    this.id = course.Id;
    this.title = course.Name;
    this.items = itemsData.getCourseChildren(options?.light ? [] : course.LinkedDeployables!);
    this._quiz = new Quiz(course.Quiz);
    this.properties = new CourseProperties(course.Settings);
    this.index = course.OrderIndex;
  }

  async save(): Promise<void> {
    const lessonsData = this.items.toDataModel().filter(isLesson) as Array<WalkMeDataNewLesson>;
    const lessons: Array<WalkMeDataLesson> = await walkme.data.saveContent(
      TypeName.Lesson,
      lessonsData,
      TypeId.Lesson,
    );
    const courseData = this.toDataModel();
    courseData.LinkedDeployables = this.items
      .toArray()
      .map((item, index) => createLink(item, index));
    courseData.LinkedDeployables.filter((item) => item.DeployableType == TypeId.Lesson).forEach(
      (item) => {
        item.DeployableID = lessons[item.DeployableID]?.Id ?? item.DeployableID;
      },
    );
    const savedCourse = await walkme.data.saveContent(TypeName.Course, courseData, TypeId.Course);
    await wmData.refresh([TypeName.Course, TypeName.Lesson]);
    this.map(savedCourse);
  }

  toDataModel(): WalkMeDataNewCourse {
    return {
      ...this._course!,
      Name: this.title,
      OrderIndex: this.index,
      Settings: this.properties.toDataModel(),
      LinkedDeployables: [],
      GroupType: GroupType.Course,
      Quiz: this._quiz.toDataModel(),
      Guid: getGuid(),
      ResourceId: getGuid(),
      deployableType: TypeId.Course,
    };
  }

  addQuiz(): Quiz | undefined {
    this.properties.hasQuiz = true;
    return this.quiz;
  }

  deleteQuiz(): void {
    this.properties.hasQuiz = false;
  }

  includes(type: TypeName, id: number): boolean {
    return this.items.includes(type, id);
  }
}
