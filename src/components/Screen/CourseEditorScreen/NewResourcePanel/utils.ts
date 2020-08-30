import { Unit } from '../../../../interfaces';

import { IWMDropdownOption } from '../../../common/WMDropdown';

import { ResourceOpenType, IResourceBaseData, IResourceVideoData } from './interface';

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
  { id: Unit.Percentages, value: '%' },
  { id: Unit.Pixels, value: 'px' },
];

export const initialNewResourceBaseData: IResourceBaseData = {
  title: 'Untitled Article',
  url: 'http://',
  openTarget: ResourceOpenType.NewTab,
  lightbox: {
    size: { width: 60, height: 60 },
    unit: sizeUnitOptions[0],
  },
};

export const initialNewVideoData: IResourceVideoData = {
  ...initialNewResourceBaseData,
  title: 'Untitled video',
  autoplay: true,
  videoPlayerParameters: '',
};

// TODO: if the following variables / methods not unnecessary remove them

export const autoplayActiveStr = 'autoplay="1"';

/**
 * video parameters should effects according to autoplay value
 */
export const generateVideoParameters = ({
  parameters,
  autoplay,
}: {
  parameters: string;
  autoplay: boolean;
}): string => (autoplay ? `autoplay="1" ${parameters}` : replaceAutoplayVideoParameter(parameters));

export const replaceAutoplayVideoParameter = (parameters: string): string =>
  parameters.includes(autoplayActiveStr) ? parameters.replace(autoplayActiveStr, '') : parameters;
