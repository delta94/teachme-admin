export enum ActionType {
  FetchCoursesData = 'FETCH_COURSES_DATA',
  FetchCoursesDataSuccess = 'FETCH_COURSES_DATA_SUCCESS',
  FetchCoursesDataError = 'FETCH_COURSES_DATA_ERROR',
  SetCoursesSearchValue = 'SET_COURSES_SEARCH_VALUE',
  SetSelectedRows = 'SET_SELECTED_ROWS',
  SetDateRange = 'SET_DATE_RANGE',
  SortTable = 'SORT_TABLE',
  SortTableSuccess = 'SORT_TABLE_SUCCESS',
  SortTableError = 'SORT_TABLE_ERROR',
  ExportCourses = 'EXPORT_COURSES',
  ExportCoursesSuccess = 'EXPORT_COURSES_SUCCESS',
  ExportCoursesError = 'EXPORT_COURSES_ERROR',
  DeleteCourses = 'DELETE_COURSES',
  DeleteCoursesSuccess = 'DELETE_COURSES_SUCCESS',
  DeleteCoursesError = 'DELETE_COURSES_ERROR',
  PublishCourses = 'PUBLISH_COURSES',
  PublishCoursesSuccess = 'PUBLISH_COURSES_SUCCESS',
  PublishCoursesError = 'PUBLISH_COURSES_ERROR',
  ArchiveCourses = 'ARCHIVE_COURSES',
  ArchiveCoursesSuccess = 'ARCHIVE_COURSES_SUCCESS',
  ArchiveCoursesError = 'ARCHIVE_COURSES_ERROR',
  ResetCourses = 'RESET_COURSES',
}
