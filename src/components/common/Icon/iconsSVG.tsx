import { ReactComponent as CoursesIcon } from '../../../images/icons/sidebar-courses.svg';
import { ReactComponent as UsersIcon } from '../../../images/icons/sidebar-users.svg';
import { ReactComponent as HeaderAvatarIcon } from '../../../images/icons/user-avatar.svg';
import { ReactComponent as HelpCircleIcon } from '../../../images/icons/help-circle.svg';
import { ReactComponent as FileExportIcon } from '../../../images/icons/file-export.svg';
import { ReactComponent as SearchIcon } from '../../../images/icons/search.svg';
import { ReactComponent as QuizIcon } from '../../../images/icons/quiz-tab.svg';
import { ReactComponent as DeleteIcon } from '../../../images/icons/delete.svg';
import { ReactComponent as PencilIcon } from '../../../images/icons/pencil.svg';
import { ReactComponent as EventCourseIcon } from '../../../images/icons/event-course.svg';
import { ReactComponent as SmartWalkthruIcon } from '../../../images/icons/smart-walkthru.svg';
import { ReactComponent as SmartWalkthruSmallIcon } from '../../../images/icons/smart-walkthru-small.svg';
import { ReactComponent as VideoIcon } from '../../../images/icons/video.svg';
import { ReactComponent as VideoSmallIcon } from '../../../images/icons/video-small.svg';
import { ReactComponent as ArticleIcon } from '../../../images/icons/article.svg';
import { ReactComponent as LessonIcon } from '../../../images/icons/lesson.svg';
import { ReactComponent as ArticleSmallIcon } from '../../../images/icons/article-small.svg';
import { ReactComponent as RefreshIcon } from '../../../images/icons/refresh.svg';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';
import { ReactComponent as QuizSettingsIcon } from '../../../images/icons/quiz-settings.svg';

import { IconType } from './icon.interface';

export const IconSVG = {
  [IconType.SidebarCourses]: CoursesIcon,
  [IconType.SidebarUsers]: UsersIcon,
  [IconType.HeaderAvatar]: HeaderAvatarIcon,
  [IconType.HelpCircle]: HelpCircleIcon,
  [IconType.FileExport]: FileExportIcon,
  [IconType.Search]: SearchIcon,
  [IconType.Quiz]: QuizIcon,
  [IconType.Delete]: DeleteIcon,
  [IconType.Pencil]: PencilIcon,
  [IconType.EventCourse]: EventCourseIcon,
  [IconType.SmartWalkthru]: SmartWalkthruIcon,
  [IconType.SmartWalkthruSmall]: SmartWalkthruSmallIcon,
  [IconType.Article]: ArticleIcon,
  [IconType.ArticleSmall]: ArticleSmallIcon,
  [IconType.Video]: VideoIcon,
  [IconType.VideoSmall]: VideoSmallIcon,
  [IconType.Content]: VideoIcon, // TODO: should remove after fixing course item type
  [IconType.Lesson]: LessonIcon,
  [IconType.Refresh]: RefreshIcon,
  [IconType.Plus]: PlusIcon,
  [IconType.QuizSettings]: QuizSettingsIcon,
};
