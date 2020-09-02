import {
  ResourceType,
  ResourceNewDataItem,
  LightBoxSizeType,
  TypeId,
  ResourcePlayMode,
} from '@walkme/types';
import { INewResource, ILightbox } from '../../../models/resource';
import { getGuid } from '../../services/guid';
import defaults from '../defaults';
import { getUniqueItemName } from '../../services/uniqueName';

export class Resource implements INewResource {
  public id: number;
  public title: string;
  public description: string;
  public url: string;
  public lightbox: ILightbox;
  public type: ResourceType;
  public openTarget: ResourcePlayMode;
  public autoplay?: boolean;
  public videoPlaerParameters?: string;

  constructor(type: ResourceType) {
    this.id = -1;
    this.type = type;
    const baseName =
      this.type == ResourceType.Video ? defaults.NEW_VIDEO_NAME : defaults.NEW_ARTICLE_NAME;
    this.title = getUniqueItemName(TypeId.Content, baseName);
    this.description = defaults.NEW_RESOURCE_DESCRIPTION;
    this.url = defaults.NEW_RESOURCE_URL;
    this.lightbox = {
      size: {
        height: defaults.NEW_RESOURCE_HEIGHT,
        width: defaults.NEW_RESOURCE_WIDTH,
      },
      unit: defaults.NEW_RESOURCE_SIZE_UNIT,
    };
    this.openTarget = defaults.NEW_RESOURCE_OPEN_TARGET;
  }

  public toDataModel(index: number): ResourceNewDataItem {
    return {
      Id: this.id > 0 ? this.id : -index - 1,
      Description: this.description,
      Name: this.title,
      OrderIndex: index,
      Type: this.type,
      Settings: {
        ContentPlayMode: this.openTarget,
        LightboxWidth: this.lightbox.size.width,
        widthUnit: this.lightbox.unit,
        LightboxHeight: this.lightbox.size.width,
        heightUnit: this.lightbox.unit,
      },
      Guid: null,
      IsModified: false,
      PublishStatus: 0,
      ResourceId: getGuid(),
      Url: this.url,
      deployableType: TypeId.Content,
    };
  }

  public isValid(): boolean {
    return false;
  }
}

export interface ILightboxSettings {
  size: { width: number; height: number };
  unit: LightBoxSizeType;
}
