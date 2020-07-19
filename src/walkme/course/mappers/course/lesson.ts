import {
  BuildLesson,
  WalkMeDataLesson,
  WalkMeDataNewLesson,
  GroupType,
  TypeId,
} from '@walkme/types';
import * as item from './item';
import { getGuid } from '../../../guid';

// export function toDataModel(
//   lesson: BuildLesson,
//   dataLesson: WalkMeDataNewLesson,
//   index: number,
// ): WalkMeDataNewLesson {
//   return {
//     ...dataLesson,
//     Name: lesson.title,
//     OrderIndex: index,
//     LinkedDeployables: lesson.childNodes?.map(item.toDataModel) || [],
//   };
// }

export function newDataModel(index: number): WalkMeDataNewLesson {
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
