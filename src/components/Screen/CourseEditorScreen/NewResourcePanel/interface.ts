import { CourseItemType } from '../../../../interfaces/course.interfaces';
import { IWMDropdownOption } from '../../../common/WMDropdown';

export type NewResourceType = CourseItemType.Article | CourseItemType.Video;

export enum ResourceOpenType {
  NewTab = 'new tab',
  Lightbox = 'lightbox',
}

export enum SizeUnit {
  Percentages = 'percentages',
  Pixels = 'pixels',
}

export interface ILightbox {
  size: { width: number; height: number };
  sizeUnit: IWMDropdownOption;
}

export interface IResourceData {
  title: string;
  url: string;
  openTarget: ResourceOpenType;
  lightbox: ILightbox;
}
