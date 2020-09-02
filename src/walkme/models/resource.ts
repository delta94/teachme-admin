import { ResourcePlayMode, LightBoxSizeType, TypeName, ResourceType } from '@walkme/types';

export interface INewResource {
  type: ResourceType;
  id: number;
  title: string;
  url: string;
  openTarget: ResourcePlayMode;
  lightbox: ILightbox;
  autoplay?: boolean;
  videoPlaerParameters?: string;
}

export { ResourcePlayMode, LightBoxSizeType };

export interface ILightbox {
  size: { width: number; height: number };
  unit: LightBoxSizeType;
}
