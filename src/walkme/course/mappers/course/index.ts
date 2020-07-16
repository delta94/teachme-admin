import {
  WalkMeDataCourse,
  BuildCourse,
  TypeName,
  BuildCourseTask,
  BuildQuiz,
  WalkMeDataLesson,
  WalkMeDataEditedCourse,
} from '@walkme/types';
import * as quiz from './quiz';
import * as settings from './settings';
import * as items from './courseItems';
import { mapItem } from '../../../item';

export async function toUIModel(
  course: WalkMeDataCourse,
  environmentId: number,
): Promise<BuildCourse> {
  return {
    id: course.Id as number,
    title: course.Name,
    items: await items.toUIModel(course.LinkedDeployables),
    quiz: quiz.toUIModel(course.Quiz),
    properties: settings.toUIModel(course.Settings),
    index: course.OrderIndex,
  };
}

export function toDataModel(
  course: BuildCourse,
  dataCourse: WalkMeDataCourse,
  dataLessons: Array<WalkMeDataLesson>,
): { course: WalkMeDataEditedCourse; lessons: Array<WalkMeDataLesson> } {
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
