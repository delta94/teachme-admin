import {
  BuildCourse,
  TypeName,
  WalkMeDataLesson,
  WalkMeDataNewCourse,
  WalkMeDataNewLesson,
  GroupType,
  TypeId,
  BooleanStringOption,
} from '@walkme/types';
import walkme from '@walkme/editor-sdk';
import * as quiz from './quiz';
import * as items from './courseItems/index';
import defaults from '../../defaults';
import { getGuid } from '../../../guid';
import { Quiz } from './quiz';
import { CourseChildContainer, isLesson } from './courseItems/index';
import { CourseProperties } from './settings';
import { createLink } from '../../../collection';
import { getDataSync } from '../../../data';
import { notEmpty } from '../../../utils';

function getUniqueCourseName(): string {
  const courseNames = getDataSync(TypeId.Course).map((course) => course.Name);
  const pattern = new RegExp(`^${defaults.COURSE_NAME} (\\d+)$`);
  const counters = courseNames
    .map((name) => name.match(pattern)?.[1])
    .filter(notEmpty)
    .map((x) => parseInt(x));
  return `${defaults.COURSE_NAME} ${Math.max(0, ...counters) + 1}`;
}

export function newDataModel(index: number): WalkMeDataNewCourse {
  return {
    Id: -1,
    Name: getUniqueCourseName(),
    OrderIndex: index,
    PublishStatus: 0,
    IsModified: false,
    Settings: {
      hasQuiz: BooleanStringOption.FALSE,
    },
    LinkedDeployables: [],
    GroupType: GroupType.Course,
    Quiz: quiz.newDataModel(),
    Guid: getGuid(),
    ResourceId: getGuid(),
    deployableType: TypeId.Course,
  };
}

export class Course implements BuildCourse {
  public index: number;
  public id: number;
  public title: string;
  public items: CourseChildContainer;
  public get quiz(): Quiz | undefined {
    return this.properties.hasQuiz ? this._quiz : undefined;
  }
  public properties: CourseProperties;
  private _quiz: Quiz;
  constructor(private _course?: WalkMeDataNewCourse) {
    if (!this._course) {
      this._course = newDataModel(0);
    }
    this.id = this._course.Id;
    this.title = this._course.Name;
    this.items = items.getCourseChildren(
      this._course.LinkedDeployables!.map((item) => {
        return item.DeployableType == TypeId.Lesson
          ? ((getDataSync(TypeId.Lesson, [item.DeployableID])[0] as unknown) as WalkMeDataNewLesson)
          : item;
      }),
    );
    this._quiz = new Quiz(this._course.Quiz);
    this.properties = new CourseProperties(this._course.Settings);
    this.index = this._course.OrderIndex;
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
    return walkme.data.saveContent(TypeName.Course, courseData, TypeId.Course);
  }

  toDataModel(): WalkMeDataNewCourse {
    return {
      ...this._course!,
      Name: this.title,
      OrderIndex: this.index,
      Settings: this.properties.toDataModel(),
      LinkedDeployables: [],
      GroupType: GroupType.Course,
      Quiz: this.properties.hasQuiz ? this._quiz.toDataModel() : quiz.newDataModel(),
      Guid: getGuid(),
      ResourceId: getGuid(),
      deployableType: TypeId.Course,
    };
  }

  addQuiz() {
    this.properties.hasQuiz = true;
    return this.quiz;
  }

  deleteQuiz() {
    this.properties.hasQuiz = false;
  }
}
