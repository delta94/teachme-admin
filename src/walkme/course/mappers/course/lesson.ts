import { BuildLesson, WalkMeDataLesson, WalkMeDataNewLesson } from '@walkme/types';
import * as item from './item';

export function toDataModel(
  lesson: BuildLesson,
  dataLesson: WalkMeDataNewLesson,
  index: number,
): WalkMeDataNewLesson {
  return {
    ...dataLesson,
    Name: lesson.title,
    OrderIndex: index,
    LinkedDeployables: lesson.childNodes?.map(item.toDataModel) || [],
  };
}
