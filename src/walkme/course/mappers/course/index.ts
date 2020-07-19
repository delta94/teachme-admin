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
} from '@walkme/types';
import * as quiz from './quiz';
import * as settings from './settings';
import * as items from './courseItems';
import { mapItem } from '../../../item';
import defaults from '../../defaults';
import { getGuid } from '../../../guid';

export async function toUIModel(
  course: WalkMeDataCourse,
  environmentId: number,
): Promise<BuildCourse> {
  return {
    id: course.Id,
    title: course.Name,
    items: await items.toUIModel(course.LinkedDeployables),
    quiz: quiz.toUIModel(course.Quiz),
    properties: settings.toUIModel(course.Settings),
    index: course.OrderIndex,
  };
}

export function toDataModel(
  course: BuildCourse,
  dataCourse: WalkMeDataCourse | WalkMeDataNewCourse,
  dataLessons: Array<WalkMeDataNewLesson>,
): {
  course: WalkMeDataEditedCourse | WalkMeDataNewCourse;
  lessons: Array<WalkMeDataNewLesson>;
} {
  const { courseItems, lessons } = items.toDataModel(course.items, dataLessons);
  const mappedCourse = {
    ...dataCourse,
    Name: course.title,
    LinkedDeployables: courseItems,
    Quiz: quiz.toDataModel(course.quiz, dataCourse.Quiz),
    OrderIndex: course.index,
    Settings: settings.toDataModel(course.properties, dataCourse.Settings),
  };
  return { course: mappedCourse, lessons };
}

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
