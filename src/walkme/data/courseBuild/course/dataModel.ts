import { WalkMeDataNewCourse, GroupType, TypeId, BooleanStringOption } from '@walkme/types';

import * as quiz from '../quiz';
import defaults from '../defaults';

import { getUniqueItemName } from '../../services/uniqueName';
import { getGuid } from '../../services/guid';

export function newDataModel(index: number): WalkMeDataNewCourse {
  return {
    Id: -1,
    Name: getUniqueItemName(TypeId.Course, defaults.COURSE_NAME),
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
