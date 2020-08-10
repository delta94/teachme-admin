import { SystemData } from '@walkme/editor-sdk/dist/system';
import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';

import { IWMDropdownOption } from '../../common/WMDropdown';

function getOptions(options: any[]): IWMDropdownOption | IWMDropdownOption[] {
  return options.length > 1 ? options : options[0];
}

export function parseEnvironments(
  environments: WalkMeEnvironment[],
): IWMDropdownOption | IWMDropdownOption[] {
  return getOptions(environments.map(({ id, name }) => ({ id, value: name })));
}

export function parseSystems(systems: SystemData[]): IWMDropdownOption | IWMDropdownOption[] {
  return getOptions(systems.map(({ userId, displayName }) => ({ id: userId, value: displayName })));
}
