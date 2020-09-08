import { CourseLesson } from '../../../walkme/data/courseBuild/courseItems/lesson';
import { CourseTask } from '../../../walkme/data/courseBuild/courseItems/task';
import { CourseItemType } from '../../../interfaces/course.interfaces';

import { DetailsPanelSettingsType } from '../../../providers/CourseEditorContext/course-editor-context.interface';

export const isNewResource = (item: CourseLesson | CourseTask): boolean =>
  Boolean((item as CourseTask).linkedItem);

export const newResourcePanelType = (type: string): DetailsPanelSettingsType =>
  type === CourseItemType.Article
    ? DetailsPanelSettingsType.Article
    : DetailsPanelSettingsType.Video;
