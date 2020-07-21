import {
  WalkMeDataNewCourseTask,
  BuildCourseTask,
  BuildCourseTaskProperties,
  CourseTaskCompletionType,
  NewCourseItemData,
} from '@walkme/types';
import { Container } from '../../../itemsContainer';
import { getDataSync } from '../../../../data';
import { getTypeName, getTypeId } from '../../../../item';

export const getCourseItems = (itemsData: Array<WalkMeDataNewCourseTask>) =>
  new Container(itemsData, (data) => new CourseTask(data), newDataModel);

export class CourseTask implements BuildCourseTask {
  public description: string;
  public id: number;
  public keywords: Array<string>;
  public properties: BuildCourseTaskProperties;
  public title: string;
  public type: string;
  constructor(private _data: WalkMeDataNewCourseTask) {
    const [item] = getDataSync(_data.DeployableType, [_data.DeployableID]);
    this.description = item.Description || '';
    this.id = (item?.Id as number) ?? -1;
    this.keywords = [];
    this.title = item.Name;
    this.type = getTypeName(_data.DeployableType);
    this.properties = {
      completionType: _data?.Settings?.cmplType ?? CourseTaskCompletionType.Completed,
    };
  }

  toDataModel(index: number): WalkMeDataNewCourseTask {
    return {
      ...this._data,
      Settings: {
        cmplType: this.properties.completionType,
      },
      OrderIndex: index,
    };
  }
}

export function newDataModel(index: number, data?: NewCourseItemData): WalkMeDataNewCourseTask {
  if (!data) throw new Error("Unknown item - Can't add item to course");
  return {
    DeployableID: data.id,
    DeployableType: getTypeId(data.type),
    OrderIndex: index,
    Settings: {
      cmplType: CourseTaskCompletionType.Completed,
    },
  };
}
