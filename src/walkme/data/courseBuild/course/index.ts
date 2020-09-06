import {
  BuildCourse,
  TypeName,
  WalkMeDataLesson,
  WalkMeDataNewCourse,
  WalkMeDataNewLesson,
  GroupType,
  TypeId,
  WalkMeDataCourseNewItem,
  WalkMeDataQuiz,
} from '@walkme/types';
import walkme from '@walkme/editor-sdk';
import * as itemsData from '../courseItems/index';
import { getGuid } from '../../services/guid';
import { Quiz, getDefaultQuiz } from '../quiz';
import { CourseChildContainer, isLesson } from '../courseItems/index';
import { CourseProperties } from '../settings';
import { createLink } from '../../services/collection';
import * as wmData from '../../services/wmData';
import * as quiz from '../quiz';
import { newDataModel } from './dataModel';
import { ITypeIdQueriable } from '../itemsContainer';
import { getCourseSegmentsSync, getLinkId } from '../../services/segments';
import { Resource } from '../resource';

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
  public segments!: Set<number>;

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
    this.properties = new CourseProperties(course.Settings, () => this._quiz.isDefault());
    this.index = course.OrderIndex;
    const segments = getCourseSegmentsSync(this.id);
    this.segments = new Set(segments.map((s) => s.id));
  }

  async save(): Promise<void> {
    await Resource.saveAll();
    const lessonsData = this.items.toDataModel().filter(isLesson) as Array<WalkMeDataNewLesson>;
    const lessons: Array<WalkMeDataLesson> = await walkme.data.saveContent(
      TypeName.Lesson,
      lessonsData,
      TypeId.Lesson,
    );
    const courseData = this.toDataModel();
    courseData.LinkedDeployables = this.items
      .toArray()
      .map((item, index) => (isLesson(item) ? createLink(item, index) : item.toDataModel(index)));
    courseData.LinkedDeployables.filter((item) => item.DeployableType == TypeId.Lesson).forEach(
      (item) => {
        item.DeployableID = lessons[item.DeployableID]?.Id ?? item.DeployableID;
      },
    );
    const savedCourse = await walkme.data.saveContent(TypeName.Course, courseData, TypeId.Course);
    await this.saveTags(savedCourse.Id);
    await wmData.refresh([TypeName.Course, TypeName.Lesson, TypeName.Content]);
    wmData.refresh([TypeName.Tag]);
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
    this._quiz.properties.isEnabled = true;
    return this.quiz;
  }

  deleteQuiz(): void {
    this.properties.hasQuiz = false;
    this._quiz = this.getDefaultQuiz();
  }

  private getDefaultQuiz() {
    return quiz.getDefaultQuiz({
      quiz: this._quiz.id,
      success: this._quiz.successScreen.id,
      fail: this._quiz.failScreen.id,
      welcome: this._quiz.welcomeScreen.id,
    });
  }

  includes(type: TypeName, id: number): boolean {
    return this.items.includes(type, id);
  }

  isValid(): boolean {
    return this._quiz.isValid();
  }

  private async saveTags(courseId: number) {
    const originalTags = getCourseSegmentsSync(this.id).map((t) => t.id);
    const tagsToAdd = Array.from(this.segments).filter((tag) => !originalTags.includes(tag));
    const tagsToRemove = originalTags.filter((tag) => !this.segments.has(tag));
    await Promise.all([
      ...tagsToAdd.map((tag) => walkme.data.tagItem(tag, TypeName.Course, courseId, TypeId.Course)),
      ...tagsToRemove.map(async (tag) => {
        const linkId = await getLinkId(TypeId.Course, courseId, tag);
        return (
          linkId && walkme.data.removeTag(tag, TypeName.Course, courseId, TypeId.Course, linkId)
        );
      }),
    ]);
  }
}
