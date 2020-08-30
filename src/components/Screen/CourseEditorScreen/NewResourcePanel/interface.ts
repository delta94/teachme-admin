import { CourseItemType } from '../../../../interfaces/course.interfaces';
import { IWMDropdownOption } from '../../../common/WMDropdown';

export type NewResourceType = CourseItemType.Article | CourseItemType.Video;

export interface INewResource {
  type: NewResourceType;
  id: number;
  item: IResourceBaseData | IResourceVideoData;
}

export enum ResourceOpenType {
  NewTab = 'new tab',
  Lightbox = 'lightbox',
}

export interface ILightbox {
  size: { width: number; height: number };
  unit: IWMDropdownOption;
}

export interface IResourceBaseData {
  title: string;
  url: string;
  openTarget: ResourceOpenType;
  lightbox: ILightbox;
}

export interface IResourceVideoData extends IResourceBaseData {
  autoplay: boolean;
  videoPlayerParameters: string;
}
