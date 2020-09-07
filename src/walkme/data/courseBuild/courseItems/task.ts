import {
  WalkMeDataNewCourseTask,
  BuildCourseTask,
  BuildCourseTaskProperties,
  CourseTaskCompletionType,
  NewCourseItemData,
  TypeName,
  ResourceNewDataItem,
  BuildLesson,
} from '@walkme/types';
import { Container, DeployableContainer } from '../itemsContainer';
import { getDataSync } from '../../services/wmData';
import { getTypeId, getTypeName, getResourceType } from '../../services/item';
import { Resource } from '../resource';

export const getCourseItems = (itemsData: Array<WalkMeDataNewCourseTask>) =>
  new DeployableContainer(itemsData, (data) => new CourseTask(data), newDataModel);

export function isUITask(value: BuildLesson | CourseTask): value is CourseTask {
  return value.type !== TypeName.Lesson;
}
export class CourseTask implements BuildCourseTask {
  public description: string;
  public id: number;
  public keywords: Array<string>;
  public properties: BuildCourseTaskProperties;
  public title: string;
  public type: string;
  public linkedItem?: Resource;

  constructor(private _data: WalkMeDataNewCourseTask) {
    this.type = getTypeName(_data.DeployableType);

    if (_data.DeployableID < 0) {
      this.linkedItem = new Resource(this.type as TypeName.Video | TypeName.Article);
    }

    const [item] = this.linkedItem
      ? [this.linkedItem.toDataModel(_data.OrderIndex)]
      : getDataSync(_data.DeployableType, [_data.DeployableID]);

    if (!item)
      throw new Error(
        `Unable to find item with type ${_data.DeployableType} and id ${_data.DeployableID}`,
      );

    this.description = item.Description || '';
    this.id = (item?.Id as number) ?? -1;
    this.keywords = [];
    this.title = item.Name;
    if (this.type == TypeName.Content) {
      this.type = getResourceType((item as ResourceNewDataItem).Type);
    }
    this.properties = {
      completionType: _data?.Settings?.cmplType ?? CourseTaskCompletionType.Completed,
    };
  }

  toDataModel(index: number): WalkMeDataNewCourseTask {
    const id = this.linkedItem ? this.linkedItem.id : this._data.DeployableID;
    return {
      ...this._data,
      DeployableID: id,
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

export type CourseItemContainer = Container<CourseTask, NewCourseItemData, WalkMeDataNewCourseTask>;
