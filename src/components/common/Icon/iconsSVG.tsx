import { ReactComponent as CoursesIcon } from '../../../images/icons/sidebar-courses.svg';
import { ReactComponent as UsersIcon } from '../../../images/icons/sidebar-users.svg';
import { ReactComponent as HeaderAvatarIcon } from '../../../images/icons/user-avatar.svg';
import { ReactComponent as HelpCircleIcon } from '../../../images/icons/help-circle.svg';
import { ReactComponent as FileExportIcon } from '../../../images/icons/file-export.svg';
// import { ReactComponent as SearchIcon } from '../../../images/icons/search.svg';
import { ReactComponent as QuizIcon } from '../../../images/icons/quiz-tab.svg';

import { IconType } from './icon.interface';

export const IconSVG = {
  [IconType.SidebarCourses]: CoursesIcon,
  [IconType.SidebarUsers]: UsersIcon,
  [IconType.HeaderAvatar]: HeaderAvatarIcon,
  [IconType.HelpCircle]: HelpCircleIcon,
  [IconType.FileExport]: FileExportIcon,
  // [IconType.Search]: SearchIcon,
  [IconType.Quiz]: QuizIcon,
};
