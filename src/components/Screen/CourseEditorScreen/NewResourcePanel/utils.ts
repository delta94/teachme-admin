import { IWMDropdownOption } from '../../../common/WMDropdown';

import { ResourceOpenType, SizeUnit, IResourceBaseData, IResourceVideoData } from './interface';

export const resourceOpenOptions = [
  {
    label: 'New Tab',
    value: ResourceOpenType.NewTab,
  },
  {
    label: 'Lightbox',
    value: ResourceOpenType.Lightbox,
  },
];

export const sizeUnitOptions: IWMDropdownOption[] = [
  { id: SizeUnit.Percentages, value: '%' },
  { id: SizeUnit.Pixels, value: 'px' },
];

export const initialNewResourceBaseData: IResourceBaseData = {
  title: '',
  url: '',
  openTarget: ResourceOpenType.NewTab,
  lightbox: {
    size: { width: 60, height: 60 },
    sizeUnit: sizeUnitOptions[0],
  },
};

export const initialNewVideoData: IResourceVideoData = {
  ...initialNewResourceBaseData,
  autoplay: true,
  videoPlayerParameters: ['autopaly="1"'],
};
