import { IconType } from './icon.interface';

import { ReactComponent as CoursesIcon } from '../../../images/icons/sidebar-courses.svg';
import { ReactComponent as UsersIcon } from '../../../images/icons/sidebar-users.svg';
import { ReactComponent as HeaderAvatarIcon } from '../../../images/icons/user-avatar.svg';
import { ReactComponent as HelpCircleIcon } from '../../../images/icons/help-circle.svg';

export const IconSVG = {
  [IconType.SidebarCourses]: CoursesIcon,
  [IconType.SidebarUsers]: UsersIcon,
  [IconType.HeaderAvatar]: HeaderAvatarIcon,
  [IconType.HelpCircle]: HelpCircleIcon,
};
