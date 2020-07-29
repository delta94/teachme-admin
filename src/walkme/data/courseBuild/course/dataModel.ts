import { getUniqueCourseName } from './uniqueName';
import { WalkMeDataNewCourse, GroupType, TypeId, BooleanStringOption } from '@walkme/types';
import { getGuid } from '../../services/guid';
import * as quiz from '../quiz';

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
