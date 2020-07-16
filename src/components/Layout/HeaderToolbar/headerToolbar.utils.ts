import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { IWMDropdownOption } from '../../common/WMDropdown';

export function parseEnvironmentsToDropdownOptions(
  environments: WalkMeEnvironment[],
): IWMDropdownOption | IWMDropdownOption[] {
  const options = environments.map(({ id, name }) => ({ id, value: name }));

  return options.length > 1 ? options : options[0];
}
