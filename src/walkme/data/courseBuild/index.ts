import { Course } from './course';
import { WalkMeDataNewCourse, TypeName } from '@walkme/types';
import * as wmData from '../services/wmData';
export * from './course';

export async function getNewCourse(): Promise<Course> {
  await initData(0);
  return new Course();
}

export async function getCourseMetadata(id: number, environmentId: number): Promise<Course> {
  const [course] = ((await wmData.getData(
    TypeName.Course,
    environmentId,
    [id],
    true,
  )) as unknown) as Array<WalkMeDataNewCourse>;
  return new Course(course, { light: true });
}

export async function getCourse(id: number, environmentId: number): Promise<Course> {
  await initData(environmentId);

  const [course] = ((await wmData.getData(TypeName.Course, environmentId, [
    id,
  ])) as unknown) as Array<WalkMeDataNewCourse>;
  return new Course(course);
}

async function initData(environmentId: number) {
  await wmData.refresh(
    [TypeName.Course, TypeName.Lesson, TypeName.Article, TypeName.SmartWalkThru, TypeName.Tag],
    environmentId,
  );
}
