import { BuildLesson, WalkMeDataLesson } from '@walkme/types';
import * as item from './item';

export function toDataModel(
  lesson: BuildLesson,
  dataLesson: WalkMeDataLesson,
  index: number,
): WalkMeDataLesson {
  return {
    ...dataLesson,
    Name: lesson.title,
    OrderIndex: index,
    LinkedDeployables: lesson.childNodes?.map(item.toDataModel) || [],
  };
}
