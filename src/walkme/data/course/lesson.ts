import {
  BuildLesson,
  WalkMeDataLesson,
  WalkMeDataNewLesson,
  GroupType,
  TypeId,
} from '@walkme/types';
import defaults from '../courseBuild/defaults';
import { getGuid } from '../services/guid';

export function newDataModel(index: number): WalkMeDataNewLesson {
  return {
    GroupType: GroupType.Lesson,
    Guid: null,
    Id: -index - 1,
    IsModified: true,
    LinkedDeployables: [],
    Name: `${defaults.NEW_LESON_NAME}`,
    OrderIndex: index,
    PublishStatus: 0,
    ResourceId: getGuid(),
    Settings: {},
    deployableType: TypeId.Lesson,
    Description: '',
  };
}
