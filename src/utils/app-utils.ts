import * as walkme from '../walkme';
import { CourseNotFoundError, TypeNotSupportedError } from '../walkme/models';

export interface IAppStatus {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export const defaultAppStatus = {
  isLoading: true,
  hasError: false,
  errorMessage: '',
};

export async function appInitiator(): Promise<IAppStatus> {
  const redirect_uri = walkme.getRedirectURI();
  const appStatus = { ...defaultAppStatus };

  try {
    await walkme.authInit({
      client_id: '9df1e0b762fd4e87bb271fcd88124323',
      post_logout_redirect_uri: redirect_uri,
      redirect_uri,
    });
    await walkme.initWalkme();

    appStatus.isLoading = false;
  } catch (err) {
    console.error(err);
    appStatus.isLoading = false;
    appStatus.hasError = true;
    appStatus.errorMessage = err;
  }

  return appStatus;
}

export function getCourseErrorMessage(error: Error, courseId?: number): string {
  switch (true) {
    case error instanceof CourseNotFoundError:
      return `Cannot find course with id ${courseId ?? ''}`;
    case error instanceof TypeNotSupportedError:
      return `This course contains unsupported items`;
    default:
      return 'Unable to get course';
  }
}
