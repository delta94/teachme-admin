import {
  ResourceType,
  ResourceNewDataItem,
  LightBoxSizeType,
  TypeId,
  ResourcePlayMode,
  TypeName,
} from '@walkme/types';
import walkme from '@walkme/editor-sdk';

import { INewResource, ILightbox } from '../../../models/resource';
import { getGuid } from '../../services/guid';
import defaults from '../defaults';
import { getUniqueItemName } from '../../services/uniqueName';
import { getDefaultFolder } from '../../services/wmData';

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
  public saved = false;

  public static newResources: Resource[] = [];

  constructor(type: TypeName.Video | TypeName.Article) {
    this.id = -1;
    this.type = type == TypeName.Video ? ResourceType.Video : ResourceType.Article;
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

    Resource.newResources.push(this);
  }

  map(data: ResourceNewDataItem) {}

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

  public static async saveAll(): Promise<void> {
    const saved = await walkme.data.saveContent(
      TypeName.Content,
      Resource.newResources.map((r, i) => r.toDataModel(i)),
      TypeId.Content,
    );
    const links: Promise<any>[] = [];
    const defaultFolder = await getDefaultFolder(0);

    Resource.newResources.forEach((resource) => {
      resource.id = saved[resource.id].Id;
      resource.saved = true;

      const linkPromise = walkme.data.addToFolder(
        defaultFolder.Id,
        TypeName.Content,
        resource.id,
        TypeId.Content,
        -1,
        { calculateOrderIndex: true },
      );
      links.push(linkPromise);
    });

    await Promise.all(links);
    Resource.resetNewResources();
  }

  public static resetNewResources(): void {
    Resource.newResources.length = 0;
  }

  public isValid(): boolean {
    return false;
  }
}

export interface ILightboxSettings {
  size: { width: number; height: number };
  unit: LightBoxSizeType;
}

// function newDataModel(index: number, type: ResourceType): ResourceNewDataItem {
//   const baseName = type == ResourceType.Video ? defaults.NEW_VIDEO_NAME : defaults.NEW_ARTICLE_NAME;
//   this.description = defaults.NEW_RESOURCE_DESCRIPTION;
//   this.url = defaults.NEW_RESOURCE_URL;
//   this.lightbox = {
//     size: {
//       height: defaults.NEW_RESOURCE_HEIGHT,
//       width: defaults.NEW_RESOURCE_WIDTH,
//     },
//     unit: defaults.NEW_RESOURCE_SIZE_UNIT,
//   };
//   this.openTarget = defaults.NEW_RESOURCE_OPEN_TARGET;
//   return {
//     Id: -1,
//     Description: defaults.NEW_RESOURCE_DESCRIPTION,
//     Name: getUniqueItemName(TypeId.Content, baseName),
//     OrderIndex: index,
//     Type: type,
//     Settings: {
//       ContentPlayMode: defaults.NEW_RESOURCE_OPEN_TARGET,
//       LightboxWidth: defaults.NEW_RESOURCE_WIDTH,
//       widthUnit: this.lightbox.unit,
//       LightboxHeight: this.lightbox.size.width,
//       heightUnit: this.lightbox.unit,
//     },
//     Guid: null,
//     IsModified: false,
//     PublishStatus: 0,
//     ResourceId: getGuid(),
//     Url: this.url,
//     deployableType: TypeId.Content,
//   };
// }
