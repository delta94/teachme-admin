import {
  WalkMeDataCourse,
  BuildCourse,
  TypeName,
  BuildCourseTask,
  BuildQuiz,
  WalkMeDataLesson,
  WalkMeDataEditedCourse,
  WalkMeDataNewCourse,
  WalkMeDataNewLesson,
  GroupType,
  TypeId,
  BuildCourseProperties,
  TypeContainer,
  NewCourseLessonData,
  NewCourseItemData,
} from '@walkme/types';
import walkme from '@walkme/editor-sdk';
import * as quiz from './quiz';
import * as settings from './settings';
import * as items from './courseItems';
import defaults from '../../defaults';
import { getGuid } from '../../../guid';
import { Quiz } from './quiz';
import { CourseChildContainer } from './courseItems';
import { CourseProperties } from './settings';
import { create } from 'domain';
import { createLink } from '../../../collection';
import { getDataSync } from '../../../data';

// export function toDataModel(
//   course: BuildCourse,
//   dataCourse: WalkMeDataCourse | WalkMeDataNewCourse,
//   dataLessons: Array<WalkMeDataNewLesson>,
// ): {
//   course: WalkMeDataEditedCourse | WalkMeDataNewCourse;
//   lessons: Array<WalkMeDataNewLesson>;
// } {
//   const { courseItems, lessons } = items.toDataModel(course.items, dataLessons);
//   const mappedCourse = {
//     ...dataCourse,
//     Name: course.title,
//     LinkedDeployables: courseItems,
//     Quiz: quiz.toDataModel(course.quiz, dataCourse.Quiz),
//     OrderIndex: course.index,
//     Settings: settings.toDataModel(course.properties, dataCourse.Settings),
//   };
//   return { course: mappedCourse, lessons };
// }

export function newDataModel(index: number): WalkMeDataNewCourse {
  return {
    Id: -1,
    Name: defaults.COURSE_NAME,
    OrderIndex: index,
    PublishStatus: 0,
    IsModified: false,
    Settings: {},
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
  public quiz: Quiz;
  public properties: CourseProperties;

  constructor(private course?: WalkMeDataNewCourse) {
    if (!this.course) {
      this.course = newDataModel(0);
    }
    this.id = this.course.Id;
    this.title = this.course.Name;
    this.items = items.getCourseChildren(
      this.course.LinkedDeployables!.map((item) => {
        return item.DeployableType == TypeId.Lesson
          ? ((getDataSync(TypeId.Lesson, [item.DeployableID])[0] as unknown) as WalkMeDataNewLesson)
          : item;
      }),
    );
    this.quiz = new Quiz(this.course.Quiz);
    this.properties = new CourseProperties(this.course.Settings);
    this.index = this.course.OrderIndex;
  }

  async save(): Promise<void> {
    const lessonsData = this.items.toDataModel() as Array<WalkMeDataNewLesson>;
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
        item.DeployableID = lessons[item.DeployableID].Id;
      },
    );
    return walkme.data.saveContent(TypeName.Course, courseData, TypeId.Course);
  }

  toDataModel(): WalkMeDataNewCourse {
    return {
      ...this.course!,
      Name: this.title,
      OrderIndex: this.index,
      Settings: this.properties.toDataModel(),
      LinkedDeployables: [],
      GroupType: GroupType.Course,
      Quiz: this.quiz.toDataModel(),
      Guid: getGuid(),
      ResourceId: getGuid(),
      deployableType: TypeId.Course,
    };
  }
}

// export async function toUIModel(
//   course: WalkMeDataCourse,
//   environmentId: number,
// ): Promise<BuildCourse> {
//   return {
//     id: course.Id,
//     title: course.Name,
//     items: await items.toUIModel(course.LinkedDeployables),
//     quiz: quiz.toUIModel(course.Quiz),
//     properties: settings.toUIModel(course.Settings),
//     index: course.OrderIndex,
//   };
// }
